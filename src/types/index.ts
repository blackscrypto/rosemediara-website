export type TestimonialStatus = "pending" | "approved" | "rejected";

export type TestimonialRow = {
  id: string;
  first_name: string;
  email: string;
  rating: number;
  content: string;
  status: TestimonialStatus;
  ip_address: string | null;
  created_at: string;
  reviewed_at: string | null;
};

export type TestimonialPublic = Pick<
  TestimonialRow,
  "id" | "first_name" | "rating" | "content" | "created_at"
>;
