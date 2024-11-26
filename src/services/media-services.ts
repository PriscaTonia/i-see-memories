import AXIOS from "@/lib/axios";

export async function UploadMedia(
  file: File | Blob,
  orderId: string,
  pageNo: number
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("orderId", orderId);
  formData.append("pageNo", pageNo as unknown as string);

  return AXIOS.post("pictures", formData);
}
