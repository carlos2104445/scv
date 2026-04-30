import { AlbumForm } from "../AlbumForm";
import { createAlbum } from "@/actions/gallery";

export default function NewAlbumPage() {
  return <AlbumForm action={createAlbum} />;
}
