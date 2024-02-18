type User = {
  id: string;
  email: string;
  name: string;
  profile_pic: string;
  role: "FARMER";
};
type Asset = {
  id: string;
  name: string;
  status: "active" | "inactive";
};
type Product = {
  id: string;
  name: string;
  description: string;
  image_url: string;
};
type Inventory = {
  id: string;
  user_id: string;
  product_id: string;
  amount: number;
  latitude: string;
  longitude: string;
};
interface ProduceDetailed extends Product {
  total_enrute_demand: number;
  total_demand: number;
  // location_demand: {
  //   district: string;
  //   data: {
  //     date: string;
  //     demand: number;
  //   }[];
  // }[];
}

type SearchProduct = {
  id: string;
  name: string;
};
