import { IconButton } from '@material-ui/core';
import { ArrowRight } from '@material-ui/icons';
import React from 'react';
import { LocalStorageService } from '../../../common/services/localStorageService';
import MainPage from './Main';

export type JsonState = {
  [row: string]: boolean;
}

export type FileObject = {
  [key: string]: any
}

const MainController: React.FC = () => {
  const [data, setFile] = React.useState<null| FileObject>(null);
  const [jsonState, setJsonState] = React.useState<JsonState>({
  });

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    event.target.files && reader.readAsText(event.target.files[0]);
  }

  function onReaderLoad(this: FileReader, event: ProgressEvent<FileReader>){
    var obj = event.target && JSON.parse(event.target.result as string);
    setFile(obj);
  }

  const onRowClick = (id: string) => {
    const newState = {...jsonState}
    newState[id] = !newState[id];
    setJsonState(newState);
  }

  const checkLevel = (level: FileObject, newJsonState: JsonState = {}) => {
    for(let key in level) {
      if(typeof level[key] === 'object') {
        checkLevel(level[key], newJsonState);
        newJsonState[key] = false;
      }
    }
    return newJsonState;
  }

  React.useEffect(() => {
    const file: null| FileObject = LocalStorageService.getItem('file');
    if(file) {
      setFile(file);
    }
  }, []);

  React.useEffect(() => {
    if(data) {
      LocalStorageService.setItem('file', data);
      let newJsonState: JsonState = {};
      newJsonState = checkLevel(data, newJsonState);
      setJsonState(newJsonState)
    }
  }, [data])


  return (
    <MainPage 
      data={data}
      onChange={onChange}
      onRowClick={onRowClick}
      jsonState={jsonState}
    />
  )
}

export default MainController;