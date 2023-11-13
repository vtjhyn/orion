'use client'

import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { FieldValues, useForm } from "react-hook-form";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { UnitProps, getUnit } from "@/store/slice/unitsSlice";
import { SettingOutlined } from "@ant-design/icons";
import ImageUpload from "../ImageUpload";
import { addMaterial } from "@/store/slice/materialSlice";
import Loader from "../Loader";

const AddMaterialForm = () => {
  const { data: units, isLoading: unitLoading } = useSelector(
    (state: RootState) => state.unit
  );
  const ref = useRef(false);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [data, setData] = useState<UnitProps[]>();

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (ref.current === false) {
      dispatch(getUnit());
    }
    return () => {
      ref.current = true;
    };
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const imgUrl = watch("imgUrl");

  const onSubmit = (data: any) => {
    data.quantity = parseInt(data.quantity);
    dispatch(addMaterial(data))
      .then((result) => {
        console.log("Material added:", result.payload);
        // Buat notifikasi
      })
      .catch((error) => {
        console.error("Error adding material:", error);
        // Handle error and show notification
      });
  };

  const handleUnitSelectChange = (e: React.MouseEvent<HTMLDivElement>) => {
    setShowModal(true);
    setModalType("Unit");
    setData(units);
  };


  const closeModal = () => {
    setShowModal(false);
    setModalType("");
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="">
      {unitLoading ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[500px] flex flex-col gap-6"
          id="productform"
        >
          <div>
            <ImageUpload value={imgUrl} onChange={(value) => setCustomValue("imgUrl", value)} />
          </div>
          <Input
            id="name"
            label="Material Name"
            disabled={false}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="quantity"
            label="Quantity"
            type="number"
            disabled={false}
            register={register}
            errors={errors}
            required
          />
          <div className="w-full flex justify-between items-center gap-4">
            <p className="font-semibold">Unit</p>
            <div className="w-[50%] flex items-center gap-2">
              <select
                {...register("unitId")}
                className="border h-full w-full p-2 text-center"
                required
              >
                <option value="">Select</option>
                {units?.map((unit: any) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
              <div onClick={handleUnitSelectChange}>
                <SettingOutlined className="hover:cursor-pointer hover:scale-110" />
              </div>
            </div>
          </div>
          <Button
            label="Save"
            type="submit"
            disabled={isLoading ? true : false}
            onClick={() => {}}
          />
        </form>
      )}

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
          onClick={handleBackgroundClick}
        >
          <Modal
            title={modalType}
            onClose={closeModal}
            id={modalType.toLowerCase()}
            data={data}
          />
        </div>
      )}
    </div>
  );
};

export default AddMaterialForm;
