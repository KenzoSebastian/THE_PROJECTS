"use client";

import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteConfirmDialog({
  isOpen,
  onOpenChange,
  onConfirm,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl border border-zinc-200/50 bg-white/95 dark:border-zinc-800/50 dark:bg-zinc-900/95 max-w-sm p-5 shadow-lg backdrop-blur-md">
        <DialogHeader className="gap-1">
          <DialogTitle className="text-base font-bold text-zinc-900 dark:text-zinc-50">
            Apakah Anda Yakin?
          </DialogTitle>
          <DialogDescription className="text-zinc-500 dark:text-zinc-400 text-xs">
            Tindakan ini tidak dapat dibatalkan. Project ini akan dihapus secara permanen dari dummy storage.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-5 flex flex-row items-center gap-2 w-full justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl flex-1 text-xs py-2.5 h-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 hover:bg-red-500 text-white flex-1 font-semibold text-xs py-2.5 h-auto"
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
