"use client";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-secondary z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-dark border-solid"></div>
    </div>
  );
}
