import {
  ChevronUp24Regular,
  ChevronDown24Regular,
} from "@fluentui/react-icons";
import { MultiEloConfig } from "multi-elo";
import {
  Dispatch,
  FC,
  InputHTMLAttributes,
  SetStateAction,
  useState,
} from "react";
import { Input } from "../input/Input";

type ExtendedSettingsProps = {
  config: MultiEloConfig;
  setConfig: Dispatch<SetStateAction<MultiEloConfig>>;
};

export const ExtendedSettings: FC<ExtendedSettingsProps> = ({
  config,
  setConfig,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={(): void => setOpen(!open)}>
        {open ? <ChevronUp24Regular /> : <ChevronDown24Regular />}
        {open ? "Hide " : "Show "}
        extended settings
      </button>
      {open && (
        <div className="grid grid-cols-[auto_auto_max(30rem)] gap-x-4 gap-y-2 overflow-x-auto max-w-[100vw] px-4 py-2">
          <ValueName>K</ValueName>
          <InputWrapper
            defaultValue={config.k}
            onBlur={(event): void =>
              setConfig({ ...config, k: Number.parseFloat(event.target.value) })
            }
          />
          <span>
            K controls how many Elo points are gained or lost in a single game
          </span>
          <ValueName>D</ValueName>
          <InputWrapper
            defaultValue={config.d}
            onBlur={(event): void =>
              setConfig({ ...config, d: Number.parseFloat(event.target.value) })
            }
          />
          <span>
            D controls the estimated win probability of each player. A commonly
            used value is D = 400, which means that a player with a 200-point
            Elo advantage is expected to win ~75% of the time. A smaller D value
            means the player with the higher Elo rating has a higher estimated
            win probability.
          </span>
          <ValueName>S</ValueName>
          <InputWrapper
            defaultValue={config.s}
            onBlur={(event): void =>
              setConfig({ ...config, s: Number.parseFloat(event.target.value) })
            }
          />
          <span>
            S is the base of the exponential score function which controls how
            points are awarded in multiplayer games
          </span>
        </div>
      )}
    </>
  );
};

const ValueName: FC = ({ children }) => (
  <span className="flex items-center text-xl font-semibold">{children}</span>
);

const InputWrapper: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <div className="flex items-center">
    <Input {...props} />
  </div>
);
