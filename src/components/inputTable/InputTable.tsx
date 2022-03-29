import { Delete24Regular } from "@fluentui/react-icons";
import classNames from "classnames";
import {
  ChangeEvent,
  Component,
  ComponentProps,
  FC,
  InputHTMLAttributes,
} from "react";
import { Team } from "../../App";
import { Button } from "../button/Button";
import { TableDataCell } from "../tableDataCell/TableDataCell";

type InputTableProps = {
  teams: Team[];
  setTeams: (teams: Team[]) => void;
};

export const InputTable: FC<InputTableProps> = ({ teams, setTeams }) => {
  const foo = "bar";

  const onUpdate = (
    event: ChangeEvent<HTMLInputElement>,
    key: keyof Team,
    index: number
  ): void => {
    setTeams([
      ...teams.slice(0, index),
      { ...teams[index], [key]: event.target.value },
      ...teams.slice(index + 1),
    ]);
  };

  const deleteRow = (index: number): void => {
    if (teams.length > 1) {
      setTeams([...teams.slice(0, index), ...teams.slice(index + 1)]);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <TableDataCell>Team Name</TableDataCell>
            <TableDataCell>Old Score</TableDataCell>
            <TableDataCell>Result Order</TableDataCell>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={index}>
              <TableDataCell>
                <Input
                  onBlur={(event): void => {
                    onUpdate(event, "name", index);
                  }}
                  defaultValue={team.name}
                />
              </TableDataCell>
              <TableDataCell>
                <Input
                  onBlur={(event): void => {
                    onUpdate(event, "rating", index);
                  }}
                  defaultValue={team.rating}
                  type="number"
                />
              </TableDataCell>
              <TableDataCell>
                <Input
                  onBlur={(event): void => {
                    onUpdate(event, "order", index);
                  }}
                  defaultValue={team.order}
                  type="number"
                />
              </TableDataCell>
              <TableDataCell>
                <Button
                  onClick={(): void => deleteRow(index)}
                  disabled={teams.length <= 1}
                >
                  <Delete24Regular
                    className={teams.length > 1 ? "fill-danger" : "fill-e-1"}
                  />
                </Button>
              </TableDataCell>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => (
  <input
    className={classNames("bg-e-2 h-8 rounded-lg px-2", className)}
    {...props}
  />
);
