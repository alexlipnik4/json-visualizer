import { IconButton, Typography } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
import React from "react";
import { FileObject, JsonState } from "../pages/Main/Main.controller";

export const LevelRender: React.FC<{
  data: FileObject,
  row: string,
  onRowClick: (id: string) => void,
  jsonState: JsonState,
  level: number,
}> = ({
  data,
  row,
  onRowClick,
  jsonState,
  level,
}) => {
  const marginSize = 28;
  if(typeof data[row] === 'object') {
    return (
      <>
        <div id={row} className="content-container__item">
          <IconButton onClick={() => onRowClick(row)} aria-label="delete" size="small">
            <ArrowRight fontSize="inherit" />
          </IconButton>
          <div className="content-container__row--object">{`${row}:`}</div>
          <div className="content-container__bracket">{data[row] instanceof Array ? '[' : '{'}</div>
        </div>

        {jsonState[row] && (
          <div style={{marginLeft: marginSize}}>
            <div style={{marginLeft: (marginSize * 1.5)}} className="content-container__item-children">
              {
                Object.keys(data[row]).map((subRow: string) => (
                  <LevelRender
                    key={subRow}
                    row={subRow}
                    data={data[row]}
                    jsonState={jsonState}
                    onRowClick={onRowClick}
                    level={level + 1}
                  />
                ))
              }
            </div>
            <div className="content-container__bracket">{data[row] instanceof Array ? ']' : '}'}</div>
          </div>
        )}
      </>
    )
  }
  return (
    <div className="content-container__item content-container__item--not-object">
      <Typography>{`${row}:`}</Typography>
      <Typography>{typeof data[row] === 'boolean' ? data[row] ? 'true' : 'false' : data[row]}</Typography>
    </div>
  )
}