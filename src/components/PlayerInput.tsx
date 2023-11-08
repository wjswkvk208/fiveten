import Paper from "@mui/material/Paper";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import { TextField } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { EditPlayer, RemovePlayer } from "@/hooks/Player";
import { useEffect, useState } from "react";

const PlayerInput = (props: any) => {
  const { index, pid, mutate, playerName, ...prop } = props;
  const [name, setName] = useState(playerName);
  const { trigger } = RemovePlayer(pid);
  const { trigger: nameTrigger } = EditPlayer(pid);
  useEffect(() => {
    if (!pid) return;
    const delayTrigger = setTimeout(() => {
      nameTrigger({ name: name });
    }, 1500);

    return () => clearTimeout(delayTrigger);
  }, [name, nameTrigger, pid]);
  return (
    <>
      <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
        <TextField sx={{ ml: 1, flex: 1 }} placeholder="Search Google Maps" {...prop} fullWidth value={name} onChange={e => setName(e.target.value)} />

        {index >= 2 && (
          <>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
              onClick={() => {
                trigger(pid, {
                  onSuccess: () => {
                    mutate();
                  },
                });
              }}
            >
              <PersonRemoveIcon />
            </IconButton>
          </>
        )}
      </Paper>
      {/* <Divider sx={{ m: 2 }} /> */}
    </>
  );
};

export default PlayerInput;
