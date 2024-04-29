import { emailRegex } from "@lib/util/regex"
import { useT } from "app/[locale]/context/sources"
import AuthModalLazy from "app/components/auth-modal"
import ConnectForm from "app/components/common/connect-form"
import Input from "app/components/common/input"
import { useMeCustomer } from "medusa-react"
import dynamic from "next/dynamic"

const AddressSelect = dynamic(() => import("../address-select"))
const CountrySelect = dynamic(() => import("../country-select"))

const ShippingAddress = () => {
  const { customer } = useMeCustomer()
  const t = useT()
  return (
    <div>
      {customer && (customer.shipping_addresses?.length || 0) > 0 && (
        <div className="mb-6 flex flex-col gap-y-4 border bg-gray-100 p-4">
          <p className="text-small-regular">
            {t(
              `Hi {{0}}, do you want to use one of your saved addresses?`
            ).replace("{{0}}", customer.first_name)}
          </p>
          <AddressSelect addresses={customer.shipping_addresses} />
        </div>
      )}
      <ConnectForm>
        {({ register, formState: { errors, touchedFields }, setValue }) => (
          <div className="flex flex-col gap-y-3">
            <div className="flex items-baseline justify-between gap-6">
              <div className="font-heading text-xl">
                {t("Contact information")}
              </div>
              {!customer && (
                <div className="inline">
                  {t("Already have an account?")}{" "}
                  <>
                    <label htmlFor="auth-modal" className="link inline-block">
                      {t("Login")}
                    </label>
                    <AuthModalLazy redirectUrl={null} />
                  </>
                </div>
              )}
            </div>
            <Input
              hideLabel
              label={t("Email")}
              {...register("email", {
                required: t("Email is required"),
                pattern: emailRegex,
              })}
              disabled={!!customer}
              autoComplete="email"
              errors={errors}
              touched={touchedFields}
            />
            {/* <label className="flex items-start justify-start gap-3 cursor-pointer label">
              <input
                type="checkbox"
                className="checkbox checkbox-xs checkbox-primary"
              />
              <span className="text-sm leading-none label-text">
                {t("Email me with news and offers")}
              </span>
            </label> */}
            <div className="col-span-2 mt-6 flex w-full items-baseline justify-between gap-6">
              <div className="font-heading text-xl">
                {t("Shipping address")}
              </div>
            </div>
            <CountrySelect
              {...register("shipping_address.country_code", {
                required: t("Country is required"),
              })}
              autoComplete="country"
              errors={errors}
              touched={touchedFields}
            />
            <div className="grid grid-cols-2 gap-x-2">
              <Input
                label={t("First name")}
                {...register("shipping_address.first_name", {
                  required: t("First name is required"),
                })}
                autoComplete="given-name"
                errors={errors}
                touched={touchedFields}
              />
              <Input
                label={t("Last name")}
                {...register("shipping_address.last_name", {
                  required: t("Last name is required"),
                })}
                autoComplete="family-name"
                errors={errors}
                touched={touchedFields}
              />
            </div>
            {/* <Input
              label="Company"
              {...register("shipping_address.company")}
              autoComplete="organization"
              errors={errors}
              touched={touchedFields}
            /> */}

            <Input
              label={t("Address")}
              autoComplete="address-line1"
              errors={errors}
              touched={touchedFields}
              {...register("shipping_address.address_1", {
                required: t("Address is required"),
              })}
            />

            <Input
              label={t("Apartments, suite, etc.")}
              {...register("shipping_address.address_2")}
              autoComplete="address-line2"
              errors={errors}
              touched={touchedFields}
            />
            <div className="grid grid-cols-2 gap-x-2">
              <Input
                label={t("City")}
                {...register("shipping_address.city", {
                  required: t("City is required"),
                })}
                autoComplete="address-level2"
                errors={errors}
                touched={touchedFields}
              />
              <Input
                label={t("Postal code")}
                {...register("shipping_address.postal_code", {
                  required: t("Postal code is required"),
                })}
                autoComplete="postal-code"
                errors={errors}
                touched={touchedFields}
              />
            </div>
            <Input
              label={t("Phone")}
              {...register("shipping_address.phone", {
                required: t("required"),
              })}
              autoComplete="tel"
              errors={errors}
              touched={touchedFields}
            />
          </div>
        )}
      </ConnectForm>
    </div>
  )
}

export default ShippingAddress
