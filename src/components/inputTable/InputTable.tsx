import { Delete24Regular } from "@fluentui/react-icons";
import { ChangeEvent, FC, RefObject } from "react";
import { Team } from "../../App";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { Control, Controller, FieldValues } from "react-hook-form";

type InputTableProps = {
  teams: Team[];
  setTeams: (teams: Team[]) => void;
  lastRowNameRef: RefObject<HTMLInputElement>;
  control: Control<FieldValues, object>;
};

export const InputTable: FC<InputTableProps> = ({
  teams,
  setTeams,
  lastRowNameRef,
  control,
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
                  ref={index + 1 === teams.length ? lastRowNameRef : undefined}
                  defaultValue={team.name}
                />
              </TableDataCell>
              <TableDataCell>
                <Controller
                  name={`${index}-rating`}
                  control={control}
                  rules={{ required: true, pattern: /^\d+(\.\d+)?$/ }}
                  defaultValue={team.rating}
                  render={({ field, fieldState: { error } }): JSX.Element => (
                    <Input
                      {...field}
                      onBlur={(event): void => {
                        onUpdate(event, "rating", index);
                        field.onBlur();
                      }}
                      type="number"
                      className={error && "!border-danger"}
                    />
                  )}
                />
              </TableDataCell>
              <TableDataCell>
                <Controller
                  name={`${index}-order`}
                  control={control}
                  rules={{ required: true, pattern: /^\d+$/ }}
                  defaultValue={team.order}
                  render={({ field, fieldState: { error } }): JSX.Element => (
                    <Input
                      {...field}
                      onBlur={(event): void => {
                        onUpdate(event, "order", index);
                        field.onBlur();
                      }}
                      type="number"
                      className={error && "!border-danger"}
                    />
                  )}
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

const TableDataCell: FC = ({ children }) => (
  <td className="px-2">{children}</td>
);
