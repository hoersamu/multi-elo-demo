import classNames from "classnames";
import { FC } from "react";
import { useAlert } from "react-alert";
import { OutputTeam } from "../../App";

const PRECISION = 2;
const HUNDRED = 100;

type OutputTableProps = {
  teams: OutputTeam[];
};

export const OutputTable: FC<OutputTableProps> = ({ teams }) => (
  <table>
    <thead>
      <tr>
        <OutputTableHeader>Team Name</OutputTableHeader>
        <OutputTableHeader className="text-right">New Score</OutputTableHeader>
        <OutputTableHeader className="text-right">Difference</OutputTableHeader>
        <OutputTableHeader className="text-right">
          Win probability
        </OutputTableHeader>
      </tr>
    </thead>
    <tbody>
      {teams
        .slice()
        .sort(compareTeamsByNewScore)
        .map((team, index) => (
          <tr key={index} className="odd:bg-e-1">
            <td className="p-2">{team.name}</td>
            <OutputTableValueField value={team.newRating} />
            <OutputTableValueField value={team.newRating - team.rating} />
            <OutputTableValueField value={team.winProp * HUNDRED} unit={"%"} />
          </tr>
        ))}
    </tbody>
  </table>
);

const compareTeamsByNewScore = (a: OutputTeam, b: OutputTeam): number =>
  b.newRating - a.newRating;

const OutputTableHeader: FC<{ className?: string }> = ({
  children,
  className,
}) => (
  <td className={classNames("text-xl px-2 py-1", className)}>{children}</td>
);

const OutputTableValueField: FC<{
  value: number;
  className?: string;
  unit?: string;
}> = ({ value, className, unit }) => {
  const alert = useAlert();

  return (
    <td title={value.toString()} className={classNames("px-2 py-1", className)}>
      <button
        className="w-full h-full text-right"
        onClick={(): void => {
          navigator.clipboard
            .writeText(value.toString())
            .then(() => alert.show("Copied value"))
            .catch(null);
        }}
      >
        {value.toFixed(PRECISION)}
        {unit}
      </button>
    </td>
  );
};
