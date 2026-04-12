"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Circle, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  year: z.string().min(4).max(4).refine((val) => !isNaN(Number(val))),
  month: z.string().min(1).max(2).refine((val) => Number(val) >= 1 && Number(val) <= 12),
  day: z.string().min(1).max(2).refine((val) => {
    const day = Number(val);
    return day >= 1 && day <= 31;
  }),
});

type FormData = z.infer<typeof formSchema>;

export function BirthdayForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: new Date().getFullYear().toString(),
      month: (new Date().getMonth() + 1).toString(),
      day: new Date().getDate().toString(),
    },
  });

  const onSubmit = (data: FormData) => {
    router.push(`/result?y=${data.year}&m=${data.month}&d=${data.day}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm"
    >
      <div className="bg-white rounded-[3rem] p-6 shadow-2xl border-b-[8px] border-gray-100 flex flex-col space-y-6">
        {/* Simplified Grid Inputs */}
        <div className="grid grid-cols-3 gap-2">
          {["year", "month", "day"].map((field) => (
            <div key={field} className="space-y-1">
              <input
                {...register(field as any)}
                className={cn(
                  "w-full px-4 py-4 bg-gray-50 border-none rounded-2xl text-center text-xl font-black focus:ring-4 focus:ring-pk-yellow/30 transition-all outline-none",
                  errors[field as keyof FormData] && "ring-4 ring-pk-red/20"
                )}
                placeholder={field.toUpperCase()}
              />
            </div>
          ))}
        </div>

        {/* Pokeball Styled Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative h-20 bg-pk-red rounded-3xl overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-pk-red/20 flex items-center justify-center disabled:opacity-50"
        >
          {/* Button Background Decor (Pokeball Half) */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-black/10" />
          
          <div className="relative z-10 flex items-center space-x-3 text-white">
            {isSubmitting ? (
              <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <div className="relative p-1 bg-white rounded-full shadow-lg group-hover:animate-shake">
                  <div className="w-6 h-6 border-4 border-black/80 rounded-full flex items-center justify-center bg-white">
                    <div className="w-1.5 h-1.5 bg-black/80 rounded-full" />
                  </div>
                </div>
                <span className="text-2xl font-black italic tracking-tighter uppercase font-staatliches">I Choose You!</span>
              </>
            )}
          </div>
        </button>
      </div>
    </form>
  );
}
