import { Delete24Regular } from "@fluentui/react-icons";
import classNames from "classnames";
import { ChangeEvent, FC, InputHTMLAttributes, RefObject } from "react";
import { Team } from "../../App";
import { Button } from "../button/Button";

type InputTableProps = {
  teams: Team[];
  setTeams: (teams: Team[]) => void;
  lastRowNameRef: RefObject<HTMLInputElement>;
};

export const InputTable: FC<InputTableProps> = ({
  teams,
  setTeams,
  lastRowNameRef,
}) => {
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
    <div className="overflow-y-hidden overflow-x-auto max-w-[100vw] pb-2">
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
                  lastRowNameRef={
                    index + 1 === teams.length ? lastRowNameRef : undefined
                  }
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
    </div>
  );
};

const Input: FC<
  InputHTMLAttributes<HTMLInputElement> & {
    lastRowNameRef?: RefObject<HTMLInputElement>;
  }
> = ({ className, lastRowNameRef, ...props }) => (
  <input
    ref={lastRowNameRef}
    className={classNames("bg-e-2 h-8 rounded-lg px-2", className)}
    {...props}
  />
);

const TableDataCell: FC = ({ children }) => (
  <td className="px-2">{children}</td>
);
