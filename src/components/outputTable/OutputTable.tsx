import { FC } from "react";
import { OutputTeam } from "../../App";
import { TableDataCell } from "../tableDataCell/TableDataCell";

const precision = 2;

type OutputTableProps = {
  teams: OutputTeam[];
};

export const OutputTable: FC<OutputTableProps> = ({ teams }) => (
  <table>
    <thead>
      <tr>
        <TableDataCell>Team Name</TableDataCell>
        <TableDataCell>New Score</TableDataCell>
        <TableDataCell>Difference</TableDataCell>
      </tr>
    </thead>
    <tbody>
      {teams
        .slice()
        .sort(compareTeamsByNewScore)
        .map((team, index) => (
          <tr key={index}>
            <td>{team.name}</td>
            <td title={team.newRating.toString()}>
              {team.newRating.toFixed(precision)}
            </td>
            <td title={(team.newRating - team.rating).toString()}>
              {(team.newRating - team.rating).toFixed(precision)}
            </td>
          </tr>
        ))}
    </tbody>
  </table>
);

const compareTeamsByNewScore = (a: OutputTeam, b: OutputTeam): number => {
  const aNewRating = a.newRating || 0;
  const bNewRating = b.newRating || 0;

  if (aNewRating === b.newRating) {
    return 0;
  }
  if (aNewRating < bNewRating) {
    return 1;
  }
  return -1;
};
