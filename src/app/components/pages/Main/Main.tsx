import { Box, IconButton, TextField, Typography } from '@material-ui/core';
import { AddCircleOutlineOutlined, ArrowRight } from '@material-ui/icons';
import React from 'react';
import { LevelRender } from '../../LevelRender/LevelRender';
import { FileObject, JsonState } from './Main.controller';
import './Main.scss';

interface IMainPage {
  data: null | FileObject;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRowClick: (id: string) => void;
  jsonState: JsonState;
  onSearch: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onTextFieldChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  textFiledValue: string;
}

const Main: React.FC<IMainPage> = ({
  data,
  onChange,
  onRowClick,
  jsonState,
  onSearch,
  onTextFieldChange,
  textFiledValue,
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
        <div className="main-page__search-container">
          <TextField
            value={textFiledValue}
            onKeyDown={e => onSearch(e)}
            onChange={e => onTextFieldChange(e)}
            label="search"
          />
        </div>

        <div className="content-container__bracket content-container__bracket--first-top">{'{'}</div>
        {data && jsonState && Object.keys(data).map((row: string) => (
          <LevelRender
            key={row}
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