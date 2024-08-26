import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export default function Type(props) {
  const [size, setSize] = useState(null);
 
  const handleOpen = (value) => setSize(value);
 
  return (
    <Fragment>
      <div className="mb-3 flex gap-3">
        <Button onClick={() => handleOpen("xs")} variant="gradient">
          Open Dialog XS
        </Button>
        <Button onClick={() => handleOpen("sm")} variant="gradient">
          Open Dialog SM
        </Button>
        <Button onClick={() => handleOpen("md")} variant="gradient">
          Open Dialog MD
        </Button>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => handleOpen("lg")} variant="gradient">
          Open Dialog LG
        </Button>
        <Button onClick={() => handleOpen("xl")} variant="gradient">
          Open Dialog XL
        </Button>
        <Button onClick={() => handleOpen("xxl")} variant="gradient">
          Open Dialog XXL
        </Button>
      </div>
      <Dialog
        open={
          size === "xs" ||
          size === "sm" ||
          size === "md" ||
          size === "lg" ||
          size === "xl" ||
          size === "xxl"
        }
        size={size || "md"}
        handler={handleOpen}
      >
        <DialogHeader>Bill description</DialogHeader>
        <DialogBody divider>
          {props.description}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleOpen(null)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}