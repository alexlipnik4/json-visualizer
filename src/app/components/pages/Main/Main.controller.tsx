
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
  const [data, setData] = React.useState<null| FileObject>(null);
  const [filteredData, setFilteredData] = React.useState<null| FileObject>(null);
  const [textFiledValue, setTextFiledValue] = React.useState<string>('');
  const [jsonState, setJsonState] = React.useState<JsonState>({
  });

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    event.target.files && reader.readAsText(event.target.files[0]);
  }

  function onReaderLoad(this: FileReader, event: ProgressEvent<FileReader>){
    var obj = event.target && JSON.parse(event.target.result as string);
    setData(obj);
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

  const recursiveFilter = (_data: FileObject, _filter: string[]) => {
    let FilterArray: string[] = _filter || [];

    const newFilterArray = Object.keys(_data).filter((key) => {
      if(typeof _data[key] === 'object') {
        FilterArray = recursiveFilter(_data[key], FilterArray);
      }
      return (
        key.includes(textFiledValue) || (typeof _data[key] === 'string' && _data[key].includes(textFiledValue))
    )})
    return newFilterArray.concat(FilterArray);
  }

  const recursiveDataFilter = (_data: FileObject, _filter: {}, filtersArray: string[]) => {
    let object: FileObject = _filter || {};

    Object.keys(_data as FileObject).forEach(key => {
      if(typeof _data[key] === 'object') {
        object = recursiveDataFilter(_data[key], object, filtersArray);
      }
      if (filtersArray.includes(key)){
        object[key] = _data[key]
      }
    });

    return object;
  }

  const onSearch = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && data) {
      const filterValue: string[] = recursiveFilter(data, []);
      const newState = recursiveDataFilter(data, {}, filterValue)
      setFilteredData(newState);
    }
  }

  const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextFiledValue(e.target.value);
  }

  React.useEffect(() => {
    const file: null| FileObject = LocalStorageService.getItem('file');
    if(file) {
      setData(file);
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
      data={filteredData || data}
      onChange={onChange}
      onRowClick={onRowClick}
      jsonState={jsonState}
      onSearch={onSearch}
      onTextFieldChange={onTextFieldChange}
      textFiledValue={textFiledValue}
    />
  )
}

export default MainController;