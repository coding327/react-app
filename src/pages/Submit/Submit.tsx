import MyHead from "@/components/MyHead";
import React, { useState, RefObject } from "react";
import { Form, Steps, Input, Calendar, DatePicker, Button } from "antd-mobile";
import { ShowToast } from "@/utils/message";
import type { DatePickerRef } from "antd-mobile/es/components/date-picker";
import dayjs from "dayjs";
const { Step } = Steps;
const Submit = () => {
  const [form] = Form.useForm();
  let [current, setCurrent] = useState<number>(0);
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
  };
  return (
    <div>
      <MyHead title="填写你的旅游日记"></MyHead>
      <Steps direction="vertical" current={current}>
        <Step title="第一步" description="记录地点时间" />
        <Step title="第二步" description="记录旅游特点" />
        <Step title="第三步" description="记录旅游感受" />
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
            <Form.Item
              name="photos"
              label="游玩图片"
              rules={[{ required: true, message: "请至少选择一张" }]}
              hasFeedback
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item name="tag" label="游玩标签">
              <Input placeholder="请输入" />
            </Form.Item>
          </div>
        )}
      </Form>

      <div className="links" style={{ padding: "20px 100px" }}>
        <Button color="success" onClick={goNext}>
          下一步
        </Button>
        <Button color="primary" disabled={current == 0}>
          上一步
        </Button>
      </div>
    </div>
  );
};

export default Submit;
