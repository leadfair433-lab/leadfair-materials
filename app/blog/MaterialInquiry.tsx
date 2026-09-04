"use client";

import { useRef, useState } from "react";

export default function MaterialInquiry() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [message, setMessage] = useState("");
  const previousOverflow = useRef("");
  function open() {
    previousOverflow.current = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    setMessage("");
  }
  function afterClose() {
    document.body.style.overflow = previousOverflow.current;
    trigger.current?.focus();
  }
  return <>
    <button type="button" className="material-inquiry-trigger" ref={trigger} onClick={open}>提交商务询盘</button>
    <dialog ref={dialog} className="material-inquiry-dialog" aria-labelledby="material-inquiry-title" aria-describedby="material-inquiry-description" onClose={afterClose} onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.current?.close(); } }}>
      <div className="material-inquiry-inner"><button type="button" className="material-inquiry-close" aria-label="关闭询盘表单" onClick={() => dialog.current?.close()}>×</button>
        <header><span>MATERIAL DEVELOPMENT / 样品与定制</span><h2 id="material-inquiry-title">提交材料询盘</h2><p id="material-inquiry-description">告诉我们您的产品应用与目标性能，以便材料工程师评估选材、试料或配方开发需求。</p></header>
        <form onSubmit={event => { event.preventDefault(); setMessage("表单已通过填写检查，但询盘尚未发送：当前为预览版本，后台未接入。您填写的内容仍保留在此表单中。"); }}>
          <div className="material-inquiry-fields">
            <label>您的姓名 <span>*</span><input name="name" autoComplete="name" required maxLength={80} placeholder="例如：张经理" /></label>
            <label>公司名称<input name="company" autoComplete="organization" maxLength={160} placeholder="请输入公司名称" /></label>
            <label>工作邮箱 <span>*</span><input name="email" autoComplete="email" type="email" required maxLength={254} placeholder="name@company.com" /></label>
            <label>联系电话<input name="phone" autoComplete="tel" type="tel" maxLength={40} placeholder="国家代码 + 电话号码" /></label>
            <label>意向材料牌号<select name="grade" defaultValue="待推荐"><option>待推荐</option>{["IUS-4065", "LF-ET78A", "LF-HR53A", "GTE-8030", "GTE-8075", "定制配方"].map(value => <option key={value}>{value}</option>)}</select></label>
            <label>产品应用 <span>*</span><select name="application" defaultValue="" required><option value="" disabled>请选择应用场景</option>{["鞋材", "中底", "鞋垫", "运动护具", "其他应用"].map(value => <option key={value}>{value}</option>)}</select></label>
            <label>成型方式<select name="process" defaultValue="待评估">{["待评估", "射出成型", "射出发泡", "押出 / 挤出", "其他製程"].map(value => <option key={value}>{value}</option>)}</select></label>
            <label>预计用量<input name="quantity" maxLength={100} placeholder="例如：试料 25 kg / 量产 5 吨每月" /></label>
          </div>
          <label className="material-inquiry-requirements">性能与项目需求 <span>*</span><textarea name="requirements" required rows={4} maxLength={4000} placeholder="请说明目标硬度（Shore A / Asker C）、密度、回弹性、颜色、使用环境、测试要求及预计交期；暂不确定的指标可留给工程师评估。" /></label>
          <label className="material-inquiry-consent"><input name="consent" type="checkbox" required />我同意就本次材料需求与我联系。</label>
          <p className="material-inquiry-preview">预览表单：后台尚未接入，提交不会发送数据。</p>
          <button className="material-inquiry-submit" type="submit">提交材料询盘 →</button>
          <p className="material-inquiry-status" role="status">{message}</p>
        </form>
      </div>
    </dialog>
  </>;
}
