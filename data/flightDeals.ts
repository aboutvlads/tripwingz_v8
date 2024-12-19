import { FlightDeal } from "@/types/flight";
import { generateDiscount, getBasePrice, isHotDeal } from "@/lib/utils/deals";

const dealFinder = {
  name: "Lousson",
  bio: "Hey I'm Lousson. I love travel, my family, a good meal, and a good deal!",
  avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
  deals: 127
};

const cityImages = {
  "Paris": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
  "Amsterdam": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017",
  "Rome": "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
  "Barcelona": "https://images.unsplash.com/photo-1583422409516-2895a77efded",
  "London": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
};

const countryEmojis: Record<string, string> = {
  "France": "🇫🇷",
  "Netherlands": "🇳🇱",
  "Italy": "🇮🇹",
  "Spain": "🇪🇸",
  "UK": "🇬🇧"
};

const cityTags: Record<string, string[]> = {
  'Paris': ['date', 'foodie'],
  'Amsterdam': ['friends', 'rave'],
  'Barcelona': ['girlstrip', 'rave'],
  'Rome': ['foodie', 'date'],
  'London': ['friends', 'cartrip']
};

export const flightDeals: FlightDeal[] = [
  "Paris, France",
  "Amsterdam, Netherlands",
  "Rome, Italy",
  "Barcelona, Spain",
  "London, UK"
].map((city) => {
  const [cityName, country] = city.split(', ');
  const basePrice = getBasePrice(cityName);
  const { discount, originalPrice } = generateDiscount(basePrice);
  
  return {
    id: `city-${cityName.toLowerCase()}`,
    destination: `${city} ${countryEmojis[country]}`,
    image: cityImages[cityName as keyof typeof cityImages],
    discount: `${discount}% off`,
    price: `€${basePrice}`,
    originalPrice: `€${originalPrice}`,
    date: "May-Jun",
    stops: "1 stop",
    from: "CDG, Paris",
    class: "Economy",
    airline: "Air France",
    departureTime: "10:30 AM",
    arrivalTime: "2:45 PM",
    duration: "4h 15m",
    baggage: "23 kg",
    amenities: ["Wi-Fi", "In-flight Meals", "Entertainment"],
    postedAt: "23 hours ago",
    dealFinder,
    tags: cityTags[cityName] || ['friends'],
    isHot: isHotDeal(cityName)
  };
});