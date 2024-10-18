import {
    LogOut,
    User,
    UserPlus,
  } from "lucide-react"
   
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Logout from "./dropdownbuttons/Logout"
import ProfileButton from "./dropdownbuttons/Profile"
import Link from "next/link"
   
  export function AvatarDropdown({ image, name }: { image:string, name:string }) {

    return (
      <div className="ml-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
         <Image
          src={image}
          alt="Profile"
          width={30}
          height={30}
          className="w-10 h-10 rounded-full object-cover"
        />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 md:ml-5 md:mt-0 md:scale-100 ml-10 mt-5 scale-125">
          <DropdownMenuLabel>Hello, {name} 👋</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {name === "Guest" ? (
             <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
             <UserPlus className="mr-2 h-4 w-4" />
              <Link href="/signin">Login</Link>
           </DropdownMenuItem>
          ) : (
            <div>
            <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <ProfileButton />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <LogOut className="mr-2 h-4 w-4" />
            <Logout />
          </DropdownMenuItem>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    )
  }