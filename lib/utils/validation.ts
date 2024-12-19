import { z } from "zod";

export const dealFormSchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  image: z.string().url("Must be a valid URL"),
  price: z.string().min(1, "Price is required"),
  originalPrice: z.string().min(1, "Original price is required"),
  date: z.string().min(1, "Date is required"),
  stops: z.string(),
  from: z.string().min(1, "Departure location is required"),
  class: z.enum(["Economy", "Business", "First"]),
  airline: z.string().min(1, "Airline is required"),
  departureTime: z.string().min(1, "Departure time is required"),
  arrivalTime: z.string().min(1, "Arrival time is required"),
  duration: z.string().min(1, "Duration is required"),
  baggage: z.string(),
  amenities: z.array(z.string()),
  tags: z.array(z.string()),
  isHot: z.boolean()
});

export type DealFormData = z.infer<typeof dealFormSchema>;