import classNames from "classnames";
import { FC } from "react";
import { OutputTeam } from "../../App";

const precision = 2;

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

const OutputTableValueField: FC<{ value: number; className?: string }> = ({
  value,
  className,
}) => (
  <td
    title={value.toString()}
    className={classNames("text-right px-2 py-1", className)}
  >
    {value.toFixed(precision)}
  </td>
);
