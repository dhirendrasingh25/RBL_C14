import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// mobile first sm md lg
export default function Timepass() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">

<div className="flex flex-col sm:flex-row w-full h-full bg-red-500">
    <div className="text-white font-bold text-3xl ">Hello IOT</div>
    <div>     <input className="bg-white sm:bg-slate-950 p-6 w-[400px] "></input></div>
    <div>   <input className="bg-blue-500 p-6 w-[800px]"></input></div>

  
</div>

    </div>

  )
}
