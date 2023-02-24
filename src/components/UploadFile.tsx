import { Ajax } from "@/api/api";
import React, {FC, useRef} from "react";

// 图片上传组件
const UploadFile: FC<any> = ({ children, emitPath }) => {

  const fileRef: any = useRef()

  const startUpload = () => {
    fileRef.current.click()
  }

  const todoUpload = async () => {
    const file = fileRef.current.files[0]
    const data = new FormData()
    data.append('file', file)
    let res: any = await Ajax.uplodafile(data)
    if (res.code === 200) {
      emitPath(res.path)
    }
  }

  return (<div onClick={startUpload}>
    <input type="file" style={{display: 'none'}} ref={fileRef} onChange={todoUpload} />
    {
      children
    }
  </div>);
};

export default UploadFile;
