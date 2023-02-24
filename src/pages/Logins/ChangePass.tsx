import MyHead from "@/components/MyHead";
import React, { FC } from "react";
import { Form, Button, Space } from "antd-mobile";
import { ShowFail, ShowSuccess, ShowToast } from "@/utils/message";
import PassInput from "@/components/PassInput";
import { reg } from "@/utils/validate";
import { history, useSearchParams } from "umi";
import { Ajax } from "@/api/api";
const ChangePass: FC = () => {
  const [query] = useSearchParams();
  const [form] = Form.useForm();
  const onFinish = async (value: any) => {
    if (value.oldpass == value.newpass) {
      ShowToast("新密码不能和旧密码一致.");
    } else {
      let res: any = await Ajax.changeuserinfo({
        password: value.newpass,
      });
      if (res.code == 200) {
        history.push("/login");
        ShowSuccess("密码修改成功");
      }
    }
  };
  const { pwd } = reg;
  return (
    <div>
      <MyHead title="修改密码"></MyHead>
      <Form
        layout="horizontal"
        form={form}
        initialValues={{
          oldpass: query.get("password"),
        }}
        onFinish={onFinish}
        onFinishFailed={() => ShowFail("表单校验失败")}
        style={{ padding: 15 }}
        footer={
          <div>
            <Space block justify="around">
              <Button
                style={{ width: "3rem" }}
                type="submit"
                color="primary"
                size="large"
              >
                提交
              </Button>
              <Button
                style={{ width: "3rem" }}
                type="reset"
                color="danger"
                size="large"
              >
                重置
              </Button>
            </Space>
          </div>
        }
      >
        <Form.Header>修改重置密码</Form.Header>

        <PassInput
          name="oldpass"
          label="旧密码"
          help="6-16位的数字和字母组合"
          placeholder="请输入"
          rules={[
            { required: true, message: "密码不能为空" },
            { pattern: pwd, message: "请输入格式正确的密码" },
          ]}
          disabled={true}
        ></PassInput>

        <PassInput
          name="newpass"
          label="新密码"
          help="6-16位的数字和字母组合"
          placeholder="请输入"
          rules={[
            { required: true, message: "密码不能为空" },
            { pattern: pwd, message: "请输入格式正确的密码" },
          ]}
        />

        <PassInput
          name="dbnewpass"
          label="确认新密码"
          help="6-16位的数字和字母组合"
          placeholder="请输入"
          rules={[
            { required: true, message: "" },
            ({ getFieldValue }: any) => ({
              validator(_: any, value: any) {
                if (value && pwd.test(value)) {
                  if (getFieldValue("newpass") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次密码不匹配!"));
                } else {
                  return Promise.reject(new Error("请输入格式正确的密码!"));
                }
              },
            }),
          ]}
          dependencies={["newpass"]}
        ></PassInput>
      </Form>
    </div>
  );
};

export default ChangePass;
