import { redirect } from "next/navigation";

export default function WishlistPage() {
  redirect("/library?ownership=wishlist");
}
