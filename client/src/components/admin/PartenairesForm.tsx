import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faUser,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import { insertPartenairesSchema, type Partenaires } from "@shared/schema";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const PartenairesFormSchema = insertPartenairesSchema;
type PartenairesFormValues = z.infer<typeof PartenairesFormSchema>;

const PartenairesForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPartenairesId, setCurrentPartenairesId] = useState<
    number | null
  >(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: Partenairess = [],
    isLoading,
    refetch,
  } = useQuery<Partenaires[]>({
    queryKey: ["https://udi-business-foji.onrender.com/api/partenaires"],
  });

  const form = useForm<PartenairesFormValues>({
    resolver: zodResolver(PartenairesFormSchema),
    defaultValues: {
      name: "",
      logo: "",
      link: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: PartenairesFormValues) =>
      apiRequest(
        "POST",
        "https://udi-business-foji.onrender.com/api/admin/Partenairess",
        data
      ),
    onSuccess: () => {
      toast({
        title: "Témoignage créé",
        description: "Le témoignage a été ajouté avec succès.",
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["https://udi-business-foji.onrender.com/api/partenaires"],
      });
      refetch();
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description:
          error.message ||
          "Une erreur s'est produite lors de la création du témoignage.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PartenairesFormValues }) =>
      apiRequest(
        "PUT",
        `https://udi-business-foji.onrender.com/api/admin/Partenairess/${id}`,
        data
      ),
    onSuccess: () => {
      toast({
        title: "Témoignage mis à jour",
        description: "Le témoignage a été mis à jour avec succès.",
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["https://udi-business-foji.onrender.com/api/partenaires"],
      });
      refetch();
      form.reset();
      setIsEditing(false);
      setCurrentPartenairesId(null);
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description:
          error.message ||
          "Une erreur s'est produite lors de la mise à jour du témoignage.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest(
        "DELETE",
        `https://udi-business-foji.onrender.com/api/admin/Partenairess/${id}`
      ),
    onSuccess: () => {
      toast({
        title: "Témoignage supprimé",
        description: "Le témoignage a été supprimé avec succès.",
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["https://udi-business-foji.onrender.com/api/partenaires"],
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description:
          error.message ||
          "Une erreur s'est produite lors de la suppression du témoignage.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PartenairesFormValues) => {
    if (isEditing && currentPartenairesId) {
      updateMutation.mutate({ id: currentPartenairesId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (Partenaires: Partenaires) => {
    setIsEditing(true);
    setCurrentPartenairesId(Partenaires.id);
    form.reset({
      name: Partenaires.name,
      logo: Partenaires.logo,
      link: Partenaires.link,
    });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentPartenairesId(null);
    form.reset();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0080FF]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? "Modifier le témoignage" : "Ajouter un témoignage"}
          </CardTitle>
          <CardDescription>
            {isEditing
              ? "Modifiez les informations du témoignage"
              : "Ajoutez un nouveau témoignage client"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Sophie Martin"
                          {...field}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL de l'image</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/avatar.jpg"
                          {...field}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poste</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Directrice Marketing"
                          {...field}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entreprise</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: TechSolutions"
                          {...field}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Témoignage</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Contenu du témoignage..."
                        className="bg-gray-800 border-gray-700 text-white"
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2 pt-2">
                {isEditing && (
                  <Button type="button" variant="outline" onClick={cancelEdit}>
                    Annuler
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                  className="bg-[#0080FF] hover:bg-[#0080FF]/80"
                >
                  <FontAwesomeIcon
                    icon={isEditing ? faEdit : faPlus}
                    className="mr-2"
                  />
                  {isEditing ? "Mettre à jour" : "Ajouter"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Témoignages existants</CardTitle>
          <CardDescription>
            Liste des témoignages clients affichés sur le site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Partenairess.length === 0 ? (
              <p className="text-center text-gray-400 py-4">
                Aucun témoignage disponible
              </p>
            ) : (
              Partenairess.map((Partenaires, index) => (
                <div
                  key={Partenaires.id}
                  className="p-6 bg-gray-800 rounded-lg relative group"
                >
                  <div className="flex items-center">
                    <img
                      src={Partenaires.logo}
                      alt={Partenaires.name}
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <a href={Partenaires.link} target="_blank" rel="noreferrer">
                      <h4 className="font-bold">{Partenaires.name}</h4>
                      <p className="text-gray-400 text-sm">
                        {Partenaires.name}
                      </p>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartenairesForm;
