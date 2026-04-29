"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { Upload, X } from "lucide-react";

const MAX_FILES = 3;
const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPT = "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp";

export type FileUploadValue = File[];

type Props = {
  id?: string;
  name?: string;
  value: FileUploadValue;
  onChange: (files: FileUploadValue) => void;
  error?: string;
  required?: boolean;
  /** Extra ids for aria-describedby (e.g. field hint from FormField) */
  describedBy?: string;
};

export function FileUpload({
  id: idProp,
  name = "photos",
  value,
  onChange,
  error,
  required,
  describedBy,
}: Props) {
  const reactId = useId();
  const inputId = idProp ?? `file-${reactId}`;
  const [rejectReason, setRejectReason] = useState<string | null>(null);

  const addFiles = useCallback(
    (list: FileList | null) => {
      if (!list?.length) return;
      setRejectReason(null);

      const next = [...value];
      for (let i = 0; i < list.length; i++) {
        const file = list[i];
        if (next.length >= MAX_FILES) {
          setRejectReason(`Maximum ${MAX_FILES} fichiers.`);
          break;
        }
        if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
          setRejectReason("Formats acceptés : JPG, PNG, WebP.");
          continue;
        }
        if (file.size > MAX_BYTES) {
          setRejectReason("Chaque fichier doit faire au plus 5 Mo.");
          continue;
        }
        next.push(file);
      }
      onChange(next);
    },
    [onChange, value],
  );

  const removeAt = (index: number) => {
    const next = value.filter((_, i) => i !== index);
    onChange(next);
    setRejectReason(null);
  };

  const uploadHint = error ?? rejectReason;
  const describeIds = [
    describedBy,
    uploadHint ? `${inputId}-hint` : null,
  ].filter(Boolean);
  const ariaDescribedBy =
    describeIds.length > 0 ? describeIds.join(" ") : undefined;

  const urls = useMemo(
    () => value.map((f) => URL.createObjectURL(f)),
    [value],
  );

  useEffect(() => {
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [urls]);

  return (
    <div className="flex flex-col gap-3">
      <input
        id={inputId}
        name={name}
        type="file"
        accept={ACCEPT}
        multiple
        required={required && value.length === 0}
        className="sr-only"
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
        aria-invalid={uploadHint ? true : undefined}
        aria-describedby={ariaDescribedBy}
      />
      <label
        htmlFor={inputId}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[14px] border-2 border-dashed border-border bg-gradient-card px-4 py-8 text-center text-sm font-medium text-text-secondary transition hover:border-accent-rose/45 hover:bg-accent-rose/[0.07]"
      >
        <Upload className="h-8 w-8 text-sage" aria-hidden />
        <span className="font-medium text-text">
          Ajouter des photos (jusqu’à {MAX_FILES}, 5 Mo max chacune)
        </span>
        <span className="text-xs">JPG, PNG ou WebP</span>
      </label>

      {value.length > 0 ? (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {value.map((file, index) => {
            const url = urls[index];
            return (
              <li
                key={`${file.name}-${index}`}
                className="relative overflow-hidden rounded-[12px] border border-border bg-gradient-card shadow-soft"
              >
                <div className="relative aspect-square w-full bg-cream">
                  {url ? (
                    // eslint-disable-next-line @next/next/no-img-element -- local blob previews
                    <img
                      src={url}
                      alt={`Aperçu ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => removeAt(index)}
                  className="absolute right-2 top-2 rounded-full bg-text/80 p-1.5 text-white hover:bg-text"
                  aria-label={`Retirer ${file.name}`}
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
                <p className="truncate px-2 py-1 text-xs font-medium text-text-secondary">
                  {file.name}
                </p>
              </li>
            );
          })}
        </ul>
      ) : null}

      {uploadHint ? (
        <p id={`${inputId}-hint`} className="text-sm text-red-700" role="alert">
          {uploadHint}
        </p>
      ) : null}
    </div>
  );
}
