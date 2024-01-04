import React, {
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import cn from 'classnames';
import { transformCapitalWordsForSlug } from 'utils/string';
import s from './ProductAdAdminModal.module.css';
import { Modal } from '../../common/Modal/Modal';
import { ProductType } from '../../../generated/graphql';
import { useAdminProductAdForm } from '../../../services/form/adminProductAdForm';

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  productAdItem: ProductType | null | undefined;
  refresh?: () => void;
}

export const ProductAdAdminModal: FC<IProps> = memo<IProps>(
  ({ isOpen, setIsOpen, productAdItem, refresh }) => {
    const { formik, handleChange } = useAdminProductAdForm(
      productAdItem,
      setIsOpen,
      isOpen,
      refresh,
    );

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'scroll';
      }
      return () => {
        document.body.style.overflow = 'scroll';
      };
    }, [isOpen]);

    const productAdDescription = useMemo(() => {
      if (!productAdItem) return null;

      if (
        !productAdItem.typeParentName?.length ||
        productAdItem.typeParentName?.[0] === 'null'
      ) {
        return <b>{productAdItem.name}</b>;
      }

      const prefix = productAdItem.typeParentName
        .join('SEPARATOR>SEPARATOR')
        .split('SEPARATOR')
        .map((item: string, i: number) => {
          if (item === '>') {
            return (
              <span key={i} style={{ color: '#61AB62' }}>
                <b>&nbsp;&gt;&nbsp;</b>
              </span>
            );
          }

          return <b key={i}>{transformCapitalWordsForSlug(item)}</b>;
        });

      return (
        <>
          <b>{prefix}</b>
          <span style={{ color: '#61AB62' }}>
            <b>&nbsp;&gt;&nbsp;</b>
          </span>
          <b>{productAdItem.name}</b>
        </>
      );
    }, [productAdItem]);

    const buttonClass = cn(s.submitButton, {
      [s.enabledButton]:
        formik.isValid && Object.values(formik.touched).length > 0,
    });
    const singleInputBrandClass = cn(s.singleRowInput, {
      [s.singleRowInputError]:
        !!formik.errors.brandCost && formik.touched.brandCost,
    });
    const singleInputMailClass = cn(s.singleRowInput, {
      [s.singleRowInputError]:
        !!formik.errors.mailOrderCost && formik.touched.mailOrderCost,
    });
    const singleInputDeliveryClass = cn(s.singleRowInput, {
      [s.singleRowInputError]:
        !!formik.errors.deliveryCost && formik.touched.deliveryCost,
    });
    const singleInputDispensaryClass = cn(s.singleRowInput, {
      [s.singleRowInputError]:
        !!formik.errors.dispensaryCost && formik.touched.dispensaryCost,
    });

    const changeHandler = useCallback(
      (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const formatedValue = event.target.value
          .replaceAll(',', '.')
          .replaceAll(/[^0-9.]/g, '');

        const dotIndex = formatedValue.indexOf('.');

        event.target.value =
          dotIndex >= 0
            ? formatedValue.slice(0, dotIndex + 1) +
              formatedValue.slice(dotIndex + 1).replaceAll('.', '')
            : formatedValue;

        handleChange(event);
      },
      [handleChange],
    );

    return (
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        style={style}
        wrapperStyle={wrapperStyle}>
        <form className={s.form} onSubmit={formik.handleSubmit}>
          <div className={s.title}>Set Impression Cost</div>
          <div className={s.description}>{productAdDescription}</div>
          <div className={s.inputRowContainer}>
            <div className={s.inputWrapper}>
              <label className={s.inputLabel}>Brand IC</label>
              <input
                className={singleInputBrandClass}
                name="brandCost"
                id="brandCost"
                onChange={changeHandler}
                value={formik.values.brandCost}
                placeholder="0"
              />
              {formik.touched.brandCost && formik.errors.brandCost ? (
                <p className={s.errorText}>{formik.errors.brandCost}</p>
              ) : null}
              <div className={s.usdSymbol}>$</div>
            </div>
            <div className={s.inputWrapper}>
              <label className={s.inputLabel}>Delivery IC</label>
              <input
                className={singleInputDeliveryClass}
                name="deliveryCost"
                id="deliveryCost"
                onChange={changeHandler}
                value={formik.values.deliveryCost}
                placeholder="0"
              />
              {formik.touched.deliveryCost && formik.errors.deliveryCost ? (
                <p className={s.errorText}>{formik.errors.deliveryCost}</p>
              ) : null}
              <div className={s.usdSymbol}>$</div>
            </div>
          </div>
          <div className={s.inputRowContainer}>
            <div className={s.inputWrapper}>
              <label className={s.inputLabel}>Dispensary IC</label>
              <input
                className={singleInputDispensaryClass}
                name="dispensaryCost"
                id="dispensaryCost"
                onChange={changeHandler}
                value={formik.values.dispensaryCost}
                placeholder="0"
              />
              {formik.touched.dispensaryCost && formik.errors.dispensaryCost ? (
                <p className={s.errorText}>{formik.errors.dispensaryCost}</p>
              ) : null}
              <div className={s.usdSymbol}>$</div>
            </div>
            <div className={s.inputWrapper}>
              <label className={s.inputLabel}>Mail Order IC</label>
              <input
                className={singleInputMailClass}
                name="mailOrderCost"
                id="mailOrderCost"
                onChange={changeHandler}
                value={formik.values.mailOrderCost}
                placeholder="0"
              />
              {formik.touched.mailOrderCost && formik.errors.mailOrderCost ? (
                <p className={s.errorText}>{formik.errors.mailOrderCost}</p>
              ) : null}
              <div className={s.usdSymbol}>$</div>
            </div>
          </div>
          <div className={s.buttonWrapper}>
            <button
              disabled={
                !(formik.isValid && Object.values(formik.touched).length > 0)
              }
              type="submit"
              className={buttonClass}>
              SAVE
            </button>
          </div>
        </form>
      </Modal>
    );
  },
);

const style: any = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.75)',
  },
  content: {},
};

const wrapperStyle = {
  overflowY: 'scroll',
  overflowX: 'hidden',
};
