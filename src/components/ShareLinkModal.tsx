"use client";

import { Modal } from "flowbite-react";
import { FC, ReactNode } from "react"
import { useInitData, initUtils } from "@telegram-apps/sdk-react";
import { en_locationText, ru_locationText } from "@/assets/location";
import affiliates from "@/assets/images/affiliates.png";
import { TbHandClick } from "react-icons/tb";

interface Val {
  tgID: string,
  openModal: boolean,
  setOpenModal: any,
}

export const ShareLinkModal: FC<Val> = ({ tgID, openModal, setOpenModal }): ReactNode => {
  const initData = useInitData();
  const local = initData?.user?.languageCode === 'ru' || initData?.user?.languageCode === 'be' || initData?.user?.languageCode === 'uk' ? ru_locationText : en_locationText;

  const shareLink = `https://t.me/share/url?url=https%3A%2F%2Ft.me%2FTeleHunterBot%2Fthapp%3Fstartapp%3D${tgID}&text=${local.share.shareText}`;
  const copyText = `${local.share.shareText}` + " https://t.me/TeleHunterBot/thapp?startapp=" + tgID;
  //bg-gradient-to-r from-purple-950 to-pink-950
  return <div>

    <Modal show={openModal} size="sm" onClose={() => setOpenModal(false)} popup position="center" className="bg-black" >
      <Modal.Header className="bg-gray-900 shadow-lg shadow-purple-500/50 bg-gray-900 border-2 border-b-0 border-purple-950">
        <div className="text-gray-300 p-1 text-sm">
          {local.share.header}
        </div>
      </Modal.Header>
      {/* <Modal.Header className="bg-gray-800" /> */}
      <Modal.Body className="bg-black shadow-lg shadow-purple-500/50 bg-gray-950 border-2 border-t-0 border-purple-950">
        <div className="space-y-6 pt-6 text-center">
          <p className="text-sm leading-relaxed text-gray-100 text-left">
            {local.share.title}
          </p>

          <div>
            <img src={affiliates} />
          </div>
          <div className="text-sm leading-relaxed text-gray-100 text-left">
            {local.share.rule1}
          </div>
          <div className="text-sm leading-relaxed text-gray-100 text-left">
            {local.share.rule2}
          </div>
          <div className='flex flex-col justify-center text-base w-full'>
            <button className="glow-on-hover w-full flex justify-between items-center px-8 my-5 h-12" onClick={() => {
              navigator.clipboard.writeText(copyText)
              alert(local.share.success)
            }}>
              <div>
                {local.share.copy}
              </div>
              <div>
                <TbHandClick />
              </div>
            </button>
            <button className="glow-on-hover w-full flex justify-between items-center px-8 my-5 h-12" onClick={() => {
              const utils = initUtils();
              utils.openLink(
                shareLink
              );
            }}>
              <div>
                {local.share.invite}
              </div>
              <div>
                <TbHandClick />
              </div>
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  </div>

};
