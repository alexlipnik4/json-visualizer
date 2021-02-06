import { IconButton, Typography } from '@material-ui/core';
import { AddCircleOutlineOutlined, ArrowRight } from '@material-ui/icons';
import React from 'react';
import { FileObject, JsonState } from './Main.controller';
import './Main.scss';

interface IMainPage {
  data: null | FileObject;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRowClick: (id: string) => void;
  jsonState: JsonState
}

const LevelRender: React.FC<{
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
      <div key={row}>
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
      </div>
    )
  }
  return (
    <div key={row} className="content-container__item content-container__item--not-object">
      <Typography>{`${row}:`}</Typography>
      <Typography>{typeof data[row] === 'boolean' ? data[row] ? 'true' : 'false' : data[row]}</Typography>
    </div>
  )
}

const Main: React.FC<IMainPage> = ({
  data,
  onChange,
  onRowClick,
  jsonState,
}) => {
  return (
    <div className="main-page">
      <div className="main-page__input-container">
        <Typography variant="h3">JSON visualizer:</Typography>
        <input onChange={e => onChange(e)} className="main-page__input" accept="application/JSON" id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <AddCircleOutlineOutlined />
          </IconButton>
        </label>
      </div>

      <div className="main-page__content-container">
        <div className="content-container__bracket content-container__bracket--first-top">{'{'}</div>
        {data && jsonState && Object.keys(data).map((row: string, index: number) => (
          <LevelRender
            row={row}
            data={data}
            jsonState={jsonState}
            onRowClick={onRowClick}
            level={1}
          />
        ))}
        <div className="content-container__bracket content-container__bracket--first-bottom">{'}'}</div>
      </div>
    </div>
  )
}

export default Main;