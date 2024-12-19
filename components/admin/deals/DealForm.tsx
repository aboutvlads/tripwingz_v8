"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FormField } from "./form/FormField";
import { FormSelect } from "./form/FormSelect";
import { dealFormSchema, type DealFormData } from "@/lib/utils/validation";
import type { FlightDeal } from "@/types/flight";

interface DealFormProps {
  onSubmit: (data: DealFormData) => void;
  initialData?: Partial<FlightDeal>;
}

export function DealForm({ onSubmit, initialData }: DealFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<DealFormData>({
    resolver: zodResolver(dealFormSchema),
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Destination"
          name="destination"
          register={register}
          error={errors.destination?.message}
          required
        />

        <FormField
          label="Image URL"
          name="image"
          register={register}
          error={errors.image?.message}
          required
        />

        <FormField
          label="Price"
          name="price"
          register={register}
          error={errors.price?.message}
          required
        />

        <FormField
          label="Original Price"
          name="originalPrice"
          register={register}
          error={errors.originalPrice?.message}
          required
        />

        <FormField
          label="Travel Date"
          name="date"
          register={register}
          error={errors.date?.message}
          required
        />

        <FormField
          label="Stops"
          name="stops"
          register={register}
          error={errors.stops?.message}
        />

        <FormField
          label="From"
          name="from"
          register={register}
          error={errors.from?.message}
          required
        />

        <FormSelect
          label="Class"
          name="class"
          options={[
            { value: "Economy", label: "Economy" },
            { value: "Business", label: "Business" },
            { value: "First", label: "First" }
          ]}
          register={register}
          error={errors.class?.message}
          required
        />

        <FormField
          label="Airline"
          name="airline"
          register={register}
          error={errors.airline?.message}
          required
        />

        <FormField
          label="Departure Time"
          name="departureTime"
          register={register}
          error={errors.departureTime?.message}
          required
        />

        <FormField
          label="Arrival Time"
          name="arrivalTime"
          register={register}
          error={errors.arrivalTime?.message}
          required
        />

        <FormField
          label="Duration"
          name="duration"
          register={register}
          error={errors.duration?.message}
          required
        />

        <FormField
          label="Baggage"
          name="baggage"
          register={register}
          error={errors.baggage?.message}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Hot Deal
          </label>
          <div className="flex items-center space-x-2">
            <Switch {...register("isHot")} />
            <span className="text-sm text-gray-500">
              Mark as hot deal
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">
          {initialData ? 'Update Deal' : 'Create Deal'}
        </Button>
      </div>
    </form>
  );
}