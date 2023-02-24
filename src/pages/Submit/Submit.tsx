import MyHead from "@/components/MyHead";
import React, { useState, RefObject, useEffect } from "react";
import {
  Form,
  Steps,
  Input,
  Calendar,
  DatePicker,
  Button,
  Tag,
  ImageUploader,
  Toast,
  ImageUploadItem,
  TextArea,
  Dialog,
} from "antd-mobile";
import { ShowToast } from "@/utils/message";
import type { DatePickerRef } from "antd-mobile/es/components/date-picker";
import dayjs from "dayjs";
import { tagList } from "@/utils";
import _ from "lodash";
import { useSessionStorageState } from "ahooks";
import { Ajax } from "@/api/api";
import { history } from "umi";
import { useCheckLogin, useLoginAuthPush } from "@/hooks/common";


const { Step } = Steps;
const Submit = () => {
  const [form] = Form.useForm();
  let [current, setCurrent] = useState<number>(0);
  let [newList, setNewList] = useState<Array<any>>(tagList);
  let [fileList, setFileList] = useState<any>([]);
  let [imgList, setImgList] = useState<any>([])
  let [content, changeContent] = useState<any>()
  let [formdata, setFormData] = useState({})
  let steps = [
    {title: '第一步', description: '记录地点时间'},
    {title: '第二步', description: '记录旅游特点'},
    {title: '第三步', description: '记录旅游感受'},
  ]
  const [appToken, setAppToken] = useSessionStorageState<string | undefined | any>('appToken')
  const [hasLogin] = useCheckLogin()
  const onFinish = () => {};
  // 进入下一步
  const goNext = () => {
    console.log(form);
    console.log(form.getFieldsValue());
    const data = form.getFieldsValue();
    if (current == 0) {
      // 第一步
      form
        .validateFields()
        .then((result) => {
          console.log(result);
          setCurrent(current + 1);
        })
        .catch((err) => {
          ShowToast("请输入有效的数据");
        });
    }
    if (current === 1) {
      if (fileList.length>0&&_.some(newList,(v:any) => v.check)) {
        setCurrent(current+1)
      } else {
        ShowToast('请选择类型和上传图片')
      }
    }
  };

  // 点击选中tag
  const chooseTagType = (item: any, index: any) => {
    if (_.filter(newList, (v: any) => v.check).length > 4 && !item.check) {
      ShowToast("最多可以选择5个");
    } else {
      newList[index] = { ...item, check: !item.check };
      setNewList([...newList]);
    }
  };

  const mockUpload = async (value: any) => {
    console.log(value);
    let data = new FormData()
    data.append('file', value)

    let res: any = await Ajax.uplodafile(data)
    if (res.code === 200) {
      Toast.clear()
      imgList.push({
        url: res.path // 后台图片路径
      })
      setImgList([...imgList])
    }
    return {
      url: URL.createObjectURL(value), // 本地显示
    };
  };

  const DeleteImg = (value: any) => {
    console.log(value)

    let index = _.findIndex(fileList, (item: any) => item.url === value.url)
    console.log(index)
    imgList.splice(index, 1)
    setImgList([...imgList])
  }

  // 上一步
  const goPrev = () => {
    setCurrent(current-1)
  }

  // 提交数据
  const submitData = async () => {
    // console.log(formdata)
    // console.log(content)
    // console.log(fileList)
    if (content) {
      // 登录才能提交
      if (appToken) {
        let params = {
          ...formdata,
          content,
          tags: _.filter(newList, (item: any) => item.check),
          imgs: fileList
        }
        let res: any = await Ajax.addtravels(params)
        if (res.code === 200) {
          history.go(-1)
        }
      } else {
        // 未登录退出对话框去登录
        Dialog.confirm({
          content: '亲，请先登录，才能发表',
          onConfirm() {
            history.push('/login')
          },
        })
      }
    } else {
      ShowToast('请先输入游记感受')
    }
  }

  useEffect(() => {
    hasLogin(() => {})
  }, [])
  return (
    <div>
      <MyHead title="填写你的旅游日记"></MyHead>
      <Steps direction="vertical" current={current}>
        {
          steps.map((item, index) => (
                    <Step title={item.title} key={index} description={item.description} />
          ))
        }
      </Steps>
      <Form
        layout="horizontal"
        form={form}
        // onFinish={onFinish}
        // onFinishFailed={()=>ShowToast('请输入完善的数据记录')}
        style={{ padding: 15 }}
      >
        {current == 0 && (
          <div>
            <Form.Item
              name="title"
              label="游记标题"
              rules={[{ required: true, message: "请输入" }]}
              hasFeedback
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name="address"
              label="游玩地点"
              rules={[{ required: true, message: "请输入" }]}
              hasFeedback
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name="date"
              label="游玩日期"
              rules={[{ required: true, message: "请选择" }]}
              hasFeedback
              trigger="onConfirm"
              onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
                datePickerRef.current?.open();
              }}
            >
              <DatePicker>
                {(value) =>
                  value ? dayjs(value).format("YYYY-MM-DD") : "请选择日期"
                }
              </DatePicker>
            </Form.Item>
          </div>
        )}

        {current == 1 && (
          <div>
            <div style={{ marginTop: 10 }}>
              <h3 style={{ color: "#666", margin: "5px 0" }}>
                游玩标签<span style={{ fontSize: "12px" }}>(最多6个)</span>
              </h3>
              {newList.map((item: any, index) => (
                <Tag
                  onClick={() => chooseTagType(item, index)}
                  color={item.check ? item.color : "#999"}
                  key={index}
                  style={{ margin: 5 }}
                >
                  {item.label}
                </Tag>
              ))}
            </div>
            <div style={{ marginTop: 10 }}>
              <h3 style={{ color: "#666", margin: "5px 0" }}>
                游玩图片
                <span style={{ fontSize: "12px" }}>(最少1张，最多9张)</span>
              </h3>
              <ImageUploader
                value={fileList}
                onChange={setFileList}
                upload={mockUpload}
                multiple
                maxCount={9}
                onDelete={DeleteImg}
                showUpload={fileList.length < 9}
                onCountExceed={(exceed) => {
                  Toast.show(`最多选择9张图片，你多选择了${exceed}张`);
                }}
              ></ImageUploader>
            </div>
          </div>
        )}

        {current == 2 && (
          <div style={{ marginTop: 10 }}>
            <h3 style={{ color: "#666", margin: "5px 0" }}>
              游记感受
              <span style={{fontSize: '12px'}}>(用心记录)</span>
            </h3>
            <TextArea placeholder="请输入你的路由感受" autoSize={{minRows: 6, maxRows: 15}} showCount maxLength={500} value={content} onChange={changeContent} style={{marginTop: 10}}></TextArea>
          </div>
        )}
      </Form>

      <div className="links" style={{ padding: "20px 100px" }}>
        {
          current!==steps.length-1 && <Button color="success" onClick={goNext} disabled={current==steps.length-1}>下一步</Button>
        }
        <Button color="primary" disabled={current == 0} onClick={goPrev}>
          上一步
        </Button>
        {
          current===steps.length-1 && <Button color="success" onClick={submitData}>提交吧</Button>
        }
      </div>
    </div>
  );
};

export default Submit;
