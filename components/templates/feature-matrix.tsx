import { cn } from "@/lib/utils";
import { CheckIcon, MinusIcon, XIcon } from "lucide-react";

// Predefined feature comparison matrix for all templates
const FEATURE_MATRIX = [
  {
    id: "installation",
    name: "Installation & Setup",
    tiers: {
      diy: {
        value: false,
        label: "Self-install",
      },
      integration: {
        value: true,
        label: "Done for you",
      },
      custom: {
        value: true,
        label: "Full integration",
      },
    },
  },
  {
    id: "config",
    name: "Configuration Assistance",
    tiers: {
      diy: {
        value: false,
        label: "Basic docs",
      },
      integration: {
        value: true,
        label: "Personalized setup",
      },
      custom: {
        value: true,
        label: "Custom workflow",
      },
    },
  },
  {
    id: "training",
    name: "Training Session",
    tiers: {
      diy: {
        value: false,
        label: "-",
      },
      integration: {
        value: true,
        label: "30 minutes",
      },
      custom: {
        value: true,
        label: "1 hour",
      },
    },
  },
  {
    id: "customization",
    name: "Customization",
    tiers: {
      diy: {
        value: "limited",
        label: "Self-service",
      },
      integration: {
        value: true,
        label: "Basic adjustments",
      },
      custom: {
        value: true,
        label: "Full custom",
      },
    },
  },
  {
    id: "support",
    name: "Priority Support",
    tiers: {
      diy: {
        value: false,
        label: "Community",
      },
      integration: {
        value: true,
        label: "Email support",
      },
      custom: {
        value: true,
        label: "Direct access",
      },
    },
  },
  {
    id: "updates",
    name: "Updates",
    tiers: {
      diy: {
        value: false,
        label: "Self-apply",
      },
      integration: {
        value: true,
        label: "1 month free",
      },
      custom: {
        value: true,
        label: "3 months free",
      },
    },
  },
  {
    id: "integrations",
    name: "Additional Integrations",
    tiers: {
      diy: {
        value: false,
        label: "DIY",
      },
      integration: {
        value: "limited",
        label: "1 integration",
      },
      custom: {
        value: true,
        label: "Multiple",
      },
    },
  },
];

export default function FeatureMatrix() {
  return (
    <div className="w-full overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left py-4 font-normal text-white/60">
                Feature
              </th>
              <th className="text-center py-4 font-normal text-white/60 px-4">
                DIY
              </th>
              <th className="text-center py-4 font-normal text-white/60 px-4">
                Integration
              </th>
              <th className="text-center py-4 font-normal text-white/60 px-4">
                Custom
              </th>
            </tr>
          </thead>
          <tbody>
            {FEATURE_MATRIX.map((feature) => (
              <tr 
                key={feature.id}
                className="border-t border-white/10 hover:bg-white/5 transition-colors duration-150"
              >
                <td className="py-4 text-white">
                  {feature.name}
                </td>
                <td className="py-4 text-center">
                  <FeatureValue 
                    value={feature.tiers.diy.value} 
                    label={feature.tiers.diy.label} 
                  />
                </td>
                <td className="py-4 text-center">
                  <FeatureValue 
                    value={feature.tiers.integration.value} 
                    label={feature.tiers.integration.label} 
                    highlight
                  />
                </td>
                <td className="py-4 text-center">
                  <FeatureValue 
                    value={feature.tiers.custom.value} 
                    label={feature.tiers.custom.label} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface FeatureValueProps {
  value: boolean | string;
  label: string;
  highlight?: boolean;
}

function FeatureValue({ value, label, highlight = false }: FeatureValueProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-1">
      <div>
        {value === true ? (
          <CheckIcon className={cn(
            "h-5 w-5", 
            highlight ? "text-indigo-400" : "text-green-400"
          )} />
        ) : value === "limited" ? (
          <MinusIcon className="h-5 w-5 text-amber-400" />
        ) : (
          <XIcon className="h-5 w-5 text-white/30" />
        )}
      </div>
      <span className={cn(
        "text-xs", 
        value === true 
          ? highlight ? "text-indigo-400" : "text-green-400"
          : value === "limited" 
            ? "text-amber-400" 
            : "text-white/50"
      )}>
        {label}
      </span>
    </div>
  );
} 