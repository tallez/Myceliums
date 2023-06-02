import { Banner } from "@components/banners"
import { DefaultActiveButton, DefaultDisabledButton } from "@components/buttons"
import { DefaultCard, SecondaryCard, TertiaryCard } from "@components/cards"
import Form from "@components/forms"
import {
  IssueIcon,
  LoadingIcon,
  PullRequestIcon,
  ValidateIcon,
} from "@components/icons"
import { NavBar } from "@components/navbars"

export default function GraphicChartPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col space-y-10 p-10">
        <div className="flex flex-col space-y-4">
          <div className="font-raleway text-3xl font-bold"> Fonts </div>
          <hr></hr>
          <div className="flex flex-col space-y-4">
            <div className="font-raleway text-3xl font-bold">
              Title : Raleway
            </div>
            <div className="font-crimson text-2xl">Subtitle : Crimson</div>
            <div className="font-playfair text-lg font-light">
              This is the playfair font, it will be used as body font
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="font-raleway text-3xl font-bold"> Colors </div>
          <hr></hr>
          <div className="flex flex-col">
            <div className="my-6 font-crimson text-2xl">Accent Colors</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="h-full w-full p-4">
                Primary-Color
                <div className="my-4 flex w-full items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-primary-500"></div>
                </div>
              </div>
              <div className="flex h-full w-full flex-col justify-between bg-primary-500 p-4">
                <div className="flex w-full justify-start">Primary</div>
                <div className="flex w-full justify-end">Primary 500</div>
              </div>
              <div className="flex h-full w-full flex-col justify-between bg-primary-990 p-4">
                <div className="flex w-full justify-start text-primary-500">
                  On Primary
                </div>
                <div className="flex w-full justify-end text-primary-500">
                  Primary 100
                </div>
              </div>
              <div className="flex h-full w-full flex-col justify-between bg-primary-100 p-4">
                <div className="flex w-full justify-start text-primary-900">
                  Primary Container
                </div>
                <div className="flex w-full justify-end text-primary-900">
                  Primary 90
                </div>
              </div>
              <div className="flex h-full w-full flex-col justify-between bg-primary-900 p-4">
                <div className="flex w-full justify-start text-primary-100">
                  On Primary Container
                </div>
                <div className="flex w-full justify-end text-primary-100">
                  Primary 100
                </div>
              </div>

              <div className="h-full w-full p-4">
                Secondary-Color
                <div className="my-4 flex w-full items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-secondary-400"></div>
                </div>
              </div>
              <div className="flex h-full w-full flex-col justify-between bg-secondary-400 p-4">
                <div className="flex w-full justify-start">Secondary</div>
                <div className="flex w-full justify-end">Secondary 500</div>
              </div>
              <div className="flex h-full w-full flex-col justify-between bg-secondary-990 p-4">
                <div className="flex w-full justify-start text-secondary-400">
                  On Secondary
                </div>
                <div className="flex w-full justify-end text-secondary-400">
                  Secondary 100
                </div>
              </div>
              <div className="flex h-full w-full flex-col justify-between bg-secondary-100 p-4">
                <div className="flex w-full justify-start text-secondary-900">
                  Secondary Container
                </div>
                <div className="flex w-full justify-end text-secondary-900">
                  Secondary 90
                </div>
              </div>
              <div className="flex h-full w-full flex-col justify-between bg-secondary-900 p-4">
                <div className="flex w-full justify-start text-secondary-100">
                  On Secondary Container
                </div>
                <div className="flex w-full justify-end text-secondary-100">
                  Secondary 100
                </div>
              </div>

              <div className="h-full w-full p-4">
                Tertiary-Color
                <div className="my-4 flex w-full items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-tertiary-500"></div>
                </div>
              </div>
              <div className="flex h-full w-full flex-col justify-between bg-tertiary-500 p-4">
                <div className="flex w-full justify-start">Tertiary</div>
                <div className="flex w-full justify-end">Tertiary 500</div>
              </div>
              <div className="flex h-full w-full flex-col justify-between bg-tertiary-990 p-4">
                <div className="flex w-full justify-start text-tertiary-500">
                  On Tertiary
                </div>
                <div className="flex w-full justify-end text-tertiary-500">
                  Tertiary 100
                </div>
              </div>
              <div className="flex h-full w-full flex-col justify-between bg-tertiary-100 p-4">
                <div className="flex w-full justify-start text-tertiary-900">
                  Tertiary Container
                </div>
                <div className="flex w-full justify-end text-tertiary-900">
                  Tertiary 90
                </div>
              </div>
              <div className="flex h-full w-full flex-col justify-between bg-tertiary-900 p-4">
                <div className="flex w-full justify-start text-tertiary-100">
                  On Tertiary Container
                </div>
                <div className="flex w-full justify-end text-tertiary-100">
                  Tertiary 100
                </div>
              </div>
            </div>
            <div className="my-6 font-crimson text-2xl">Neutral Colors</div>
          </div>
        </div>{" "}
        <div className="flex flex-col space-y-2">
          <div className="font-raleway text-3xl font-bold">Components</div>
          <hr></hr>
          <div className="my-6 font-crimson text-2xl">Buttons</div>
          <div className="grid grid-cols-5 gap-2">
            <DefaultActiveButton />
            <DefaultDisabledButton />
          </div>
          <div className="my-6 font-crimson text-2xl">NavBars</div>
          <div className="grid grid-cols-5 gap-2">
            <NavBar />
          </div>
          <div className="my-6 font-crimson text-2xl">Icons</div>
          <div className="w-1/2">
            <div className="grid grid-cols-6 gap-5">
              <div className="flex flex-row justify-between">
                <label className="">Loading : </label>
                <LoadingIcon />
              </div>
              <div className="flex flex-row justify-between">
                <label className="">Validation : </label>
                <ValidateIcon />
              </div>
              <div className="flex flex-row justify-between">
                <label className="">Propositon : </label>
                <PullRequestIcon />
              </div>
              <div className="flex flex-row justify-between">
                <label className="">Issue : </label>
                <IssueIcon />
              </div>
            </div>
          </div>
          <div className="text-secondary-300">
            More can be added on demand ...
          </div>
          <div className="my-6 font-crimson text-2xl">Cards</div>
          <div className="grid grid-cols-3 gap-5">
            <DefaultCard />
            <SecondaryCard />
            <TertiaryCard />
          </div>
          <div className="my-6 font-crimson text-2xl">Forms</div>
          <div className="grid grid-cols-3 gap-5">
            <Form title="Test Form" />
          </div>
          <div className="my-6 text-2xl">Banners</div>
          <Banner />
        </div>
      </main>
    </>
  )
}
