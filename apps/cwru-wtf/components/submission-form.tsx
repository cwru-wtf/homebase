"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PhoneInput from "@/components/phone-input";

const submissionSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .endsWith("@case.edu", "Must be a @case.edu email"),
    categories: z
      .array(z.string())
      .min(1, "Please select at least one category"),
    otherCategory: z.string().optional(),
    wtfIdea: z
      .string()
      .min(1, "Please tell us your WTF idea")
      .max(600, "Maximum 100 words (approximately 600 characters)"),
    currentProject: z
      .string()
      .min(1, "Please tell us about your current project")
      .max(600, "Maximum 100 words (approximately 600 characters)"),
    youtubeLink: z.string().url("Please enter a valid URL"),
    whatsapp: z.string().optional(),
  })
  .refine(
    (data) => {
      // If "Other" is selected, otherCategory should be provided
      if (
        data.categories.includes("Other") &&
        (!data.otherCategory || data.otherCategory.trim() === "")
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Please specify the other category",
      path: ["otherCategory"],
    }
  );

type SubmissionData = z.infer<typeof submissionSchema>;

export default function SubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [whatsappValue, setWhatsappValue] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SubmissionData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      categories: [],
    },
  });

  const watchCategories = watch("categories");

  const onSubmit = async (data: SubmissionData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          "Application submitted successfully! We'll be in touch soon."
        );
        reset();
        setShowOtherInput(false);
        setWhatsappValue("");
      } else {
        if (result.error === "Email already submitted") {
          toast.error(
            "This email has already been submitted. Check your inbox for updates!"
          );
        } else if (result.details) {
          // Handle validation errors
          result.details.forEach((error: any) => {
            toast.error(error.message);
          });
        } else {
          toast.error(
            result.error || "Something went wrong. Please try again."
          );
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const currentCategories = watchCategories || [];
    if (checked) {
      setValue("categories", [...currentCategories, category]);
      if (category === "Other") {
        setShowOtherInput(true);
      }
    } else {
      setValue(
        "categories",
        currentCategories.filter((c) => c !== category)
      );
      if (category === "Other") {
        setShowOtherInput(false);
        setValue("otherCategory", "");
      }
    }
  };

  const categoryOptions = [
    "Photography / Film",
    "Art / Design",
    "Coding / Software",
    "Hardware / Electronics",
    "Other",
  ];

  return (
    <form className="mx-auto mt-12 max-w-md" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Your Name"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
          />
          {errors.name && (
            <p className="mt-1.5 text-body-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Your Email (@case.edu)"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
          />
          {errors.email && (
            <p className="mt-1.5 text-body-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div>
          <PhoneInput
            value={whatsappValue}
            onChange={(val) => {
              setWhatsappValue(val);
              setValue("whatsapp", val);
            }}
            placeholder="WhatsApp number (optional)"
          />
          <p className="mt-2 flex items-start gap-1.5 text-body-sm text-muted-foreground">
            <span className="shrink-0 leading-5">💬</span>
            <span>Our community hangs out on WhatsApp — drop your number to stay in the loop</span>
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            What's your thing?
          </label>
          <div className="space-y-2">
            {categoryOptions.map((category) => (
              <label
                key={category}
                className="flex cursor-pointer items-center rounded-lg p-2 transition-colors hover:bg-muted"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border bg-secondary text-foreground accent-foreground focus:ring-2 focus:ring-ring"
                  checked={watchCategories?.includes(category) || false}
                  onChange={(e) =>
                    handleCategoryChange(category, e.target.checked)
                  }
                />
                <span className="ml-3 text-foreground">{category}</span>
              </label>
            ))}
          </div>
          {errors.categories && (
            <p className="mt-1.5 text-body-sm text-destructive">
              {errors.categories.message}
            </p>
          )}
        </div>

        {showOtherInput && (
          <div>
            <input
              {...register("otherCategory")}
              type="text"
              placeholder="Please specify your other category"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
            />
            {errors.otherCategory && (
              <p className="mt-1.5 text-body-sm text-destructive">
                {errors.otherCategory.message}
              </p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="wtfIdea" className="sr-only">
            WTF Idea
          </label>
          <textarea
            {...register("wtfIdea")}
            id="wtfIdea"
            placeholder="What do you want to build that would make you go WTF? (100 words max)"
            rows={4}
            className="w-full resize-vertical rounded-xl border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
          />
          {errors.wtfIdea && (
            <p className="mt-1.5 text-body-sm text-destructive">
              {errors.wtfIdea.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="currentProject" className="sr-only">
            Current Project
          </label>
          <textarea
            {...register("currentProject")}
            id="currentProject"
            placeholder="What's something you have built or are building right now? (100 words max)"
            rows={4}
            className="w-full resize-vertical rounded-xl border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
          />
          {errors.currentProject && (
            <p className="mt-1.5 text-body-sm text-destructive">
              {errors.currentProject.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="youtubeLink"
            className="block text-sm font-medium text-foreground mb-3"
          >
            Drop a link to a Youtube video of something that interests you!
          </label>
          <input
            {...register("youtubeLink")}
            type="url"
            id="youtubeLink"
            placeholder="https://..."
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
          />
          {errors.youtubeLink && (
            <p className="mt-1.5 text-body-sm text-destructive">
              {errors.youtubeLink.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 rounded-xl bg-primary text-base font-medium text-primary-foreground transition-[transform,background-color] hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </form>
  );
}
