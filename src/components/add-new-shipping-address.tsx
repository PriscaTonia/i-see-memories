import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// Form schema with validation
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number." }),
  address: z.object({
    street: z.string().min(1, { message: "Street is required." }),
    zipcode: z
      .string()
      .min(5, { message: "Zipcode must be at least 5 characters." }),
    city: z.string().min(1, { message: "City is required." }),
    state: z.string().min(1, { message: "State is required." }),
    country: z.string().min(1, { message: "Country is required." }),
  }),
});

const AddNewShippingAddress = ({ isOpen, onClose }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",

      address: {
        street: "",
        zipcode: "",
        city: "",
        state: "",
        country: "",
      },
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[80%] md:max-w-[60%] lg:max-w-[45%]">
        <DialogHeader>
          <DialogTitle>Add new shipping address</DialogTitle>
        </DialogHeader>

        {/* form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-6 grid grid-cols-1 lg:grid-cols-2"
          >
            {/* Name fields */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Contact fields */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address fields */}
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input placeholder="Street and house number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.zipcode"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Zipcode</FormLabel>
                  <FormControl>
                    <Input placeholder="Zipcode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.country"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col md:flex-row col-span-1 lg:col-span-2 justify-between w-full items-center">
              <Button
                type="button"
                className="border border-black text-black w-fit bg-white hover:bg-black hover:text-white"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button type="submit" onClick={onClose}>
                Add address
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewShippingAddress;
