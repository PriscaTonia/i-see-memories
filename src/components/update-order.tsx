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
import { useMutation } from "@tanstack/react-query";
import { notify } from "@/lib/notify";
import { AxiosError } from "axios";
import { LoadingSpinner } from "./ui/loading-spinner";
import { useEffect, useState } from "react";
import { OrderItem } from "@/lib/types";
import { OrderStatusEnum, updateAnOrder } from "@/services/order-services";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  orderItem: OrderItem;
}

// Form schema with validation
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  status: z.nativeEnum(OrderStatusEnum, {
    errorMap: () => ({ message: "Invalid status." }),
  }),
  phoneNumber: z
    .string()
    .regex(/^(\+?\d{1,3})?(\(?\d{1,4}\)?[-.\s]?)?[\d\s-]{7,14}$/, {
      message: "Invalid phone number.",
    }),
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

const UpdateOrder = ({ isOpen, onClose, refetch, orderItem }: Props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Save form values to state when the modal is shown
  const [formValues, setFormValues] = useState<z.infer<
    typeof formSchema
  > | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      status: OrderStatusEnum.Paid,
      address: {
        street: "",
        zipcode: "",
        city: "",
        state: "",
        country: "",
      },
    },
  });

  const { setValue } = form;

  // update shipping address for all cart items
  const { mutate: updateOrder, isPending: isUpdateOrderPending } = useMutation({
    mutationFn: async ({
      body,
      orderId,
    }: {
      orderId: string;
      body: {
        shippingDetails: {
          name?: string;
          zipcode?: string;
          country?: string;
          street?: string;
          state?: string;
          city?: string;
          phoneNum?: string;
        };
        status?: OrderStatusEnum;
      };
    }) => {
      return await updateAnOrder({ body, orderId });
    },
    onSuccess: async () => {
      notify("success", "Order Updated successfully!");
      refetch();
      onClose();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error?.response?.data?.message;
      notify("error", message as string);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.status === OrderStatusEnum.Delivered) {
      setShowConfirmModal(true); // Show the confirmation modal when "Delivered" is selected
      setFormValues(values); // Save the form values to use in handleConfirm
    } else {
      await submitForm(values); // Directly submit the form
    }
  };

  const submitForm = async (values: z.infer<typeof formSchema>) => {
    const orderBody = {
      orderId: orderItem?._id,
      body: {
        shippingDetails: {
          name: `${values.firstName} ${values.lastName}`,
          zipcode: values.address.zipcode,
          country: values.address.country,
          street: values.address.street,
          state: values.address.state,
          city: values.address.city,
          phoneNum: values.phoneNumber,
        },
        status: values.status,
      },
    };

    await updateOrder({ body: orderBody.body, orderId: orderBody.orderId });
  };

  const handleConfirm = async () => {
    // Use the saved form values to proceed with submission
    if (formValues) {
      await submitForm(formValues);
    }
    setShowConfirmModal(false);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  useEffect(() => {
    if (orderItem) {
      // Split name into firstName and lastName
      const [firstName = "", lastName = ""] =
        orderItem?.shippingDetails?.name?.split(" ") || [];

      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("phoneNumber", orderItem?.shippingDetails?.phoneNum || "");
      setValue("address.street", orderItem?.shippingDetails?.street || "");
      setValue("address.zipcode", orderItem?.shippingDetails?.zipcode || "");
      setValue("address.city", orderItem?.shippingDetails?.city || "");
      setValue("address.state", orderItem?.shippingDetails?.state || "");
      setValue("address.country", orderItem?.shippingDetails?.country || "");
      setValue("status", orderItem?.status || OrderStatusEnum.Paid);
    }
  }, [setValue, orderItem]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[80%] max-h-[80%] overflow-y-auto md:max-w-[60%] lg:max-w-[45%]">
          <DialogHeader>
            <DialogTitle>Update shipping address</DialogTitle>
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

              {/* status */}

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="col-span-1 flex flex-col">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="input py-2 px-3 rounded-md border cursor-pointer"
                      >
                        {Object.values(OrderStatusEnum).map((status) => (
                          <option
                            key={status}
                            value={status}
                            className="cursor-pointer"
                          >
                            {status}
                          </option>
                        ))}
                      </select>
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

                <Button type="submit" disabled={isUpdateOrderPending}>
                  {isUpdateOrderPending && <LoadingSpinner />} Update order
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={handleCancel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delivery Status</DialogTitle>
          </DialogHeader>
          <div>
            <p className="text-sm text-gray-700">
              {` Changing the order status to 'Delivered' will permanently delete it's
              images, and they cannot be recovered. Do you
              want to continue?`}
            </p>
          </div>
          <DialogFooter className="flex justify-between">
            <Button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              className="bg-red-600 text-white"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateOrder;
