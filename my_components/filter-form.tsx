"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const items = [
  { id: "adulte", label: "Adulte" },
  { id: "drame", label: "Drame" },
  { id: "science-fiction", label: "Science-fiction" },
  { id: "comedie", label: "Comédies" },
  { id: "ordonner_par_date_sortie", label: "Ordonner par date de sortie" },
] as const;

const FormSchema = z.object({
  items: z.array(z.string()),
});

export function Filter_From({ onFilterSubmit }: { onFilterSubmit: (filters: string) => void }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  // Mapping entre les ids des items et leurs correspondants API
  const filterMapping: Record<string, string> = {
    adulte: "include_adult=true",
    drame: "with_genres=18", // Drame
    "science-fiction": "with_genres=878", // Science-fiction
    comedie: "with_genres=35",
    ordonner_par_date_sortie: "sort_by=release_date.desc", // Tri par date de sortie
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const filters = data.items
      .map((item) => filterMapping[item])
      .join("&");

    onFilterSubmit(filters);

    toast({
      title: "Filtres appliqués :",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code>{JSON.stringify(data.items, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="p-4 rounded-lg">
          <FormLabel className="text-lg font-semibold text-blue-700"></FormLabel>
          <FormDescription className="text-sm text-blue-600">
            Sélectionnez les filtres que vous souhaitez appliquer :
          </FormDescription>
        </div>

        {/* Conteneur en ligne */}
        <div className="flex flex-wrap items-center gap-4 p-4 shadow-sm">
          {items.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name="items"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, item.id])
                          : field.onChange(field.value?.filter((value) => value !== item.id));
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-medium ">
                    {item.label}
                  </FormLabel>
                </FormItem>
              )}
            />
          ))}
        </div>

        <Button
          type="submit"
          className="w-full"
        >
          Appliquer les filtres
        </Button>
      </form>
    </Form>
  );
}
