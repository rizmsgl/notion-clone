"use client";
import { useSettings } from "@/hooks/useSettings";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { ThemeSelector } from "../ThemeSelector";

type Props = {};

const SettingsModal = (props: Props) => {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My Settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Note Niche looks on your device
            </span>
          </div>
          <ThemeSelector />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
