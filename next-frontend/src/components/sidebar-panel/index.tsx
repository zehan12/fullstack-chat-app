import {
  ListFilter,
  LogOut,
  MessageSquareDiff,
  Search,
  User,
} from "lucide-react";
import { Input } from "../ui/input";
import { conversationsData } from "../../mocks";
import { Conversation } from "./conversations";
import { ThemeToggle } from "../shared";
import { SignInButton } from "../auth/SignInButton";

export const SidebarPanel = () => {
  const conversations: any = conversationsData;

  return (
    <div className="w-1/4 border-gray-600 border-r">
      <div className="sticky top-0 bg-left-panel z-10">
        <div className="flex justify-between bg-gray-primary p-3 items-center">
          <User size={24} />
          <div className="flex items-center gap-3">
            <MessageSquareDiff size={20} /> <ThemeToggle />
            <SignInButton />
            <LogOut size={20} className="cursor-pointer" />
          </div>
        </div>
        <div className="p-3 flex items-center">
          <div className="relative h-10 mx-3 flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search or start a new chat"
              className="pl-10 py-2 text-sm w-full rounded shadow-sm bg-gray-primary focus-visible:ring-transparent"
            />
          </div>
          <ListFilter className="cursor-pointer" />
        </div>
      </div>
      <div className="my-3 flex flex-col gap-0 max-h-[80%] overflow-auto">
        {conversationsData.map((chat) => (
          <Conversation key={chat._id} conversation={chat} />
        ))}
        {conversations?.length === 0 && (
          <>
            <p className="text-center text-gray-500 text-sm mt-3">
              No conversations yet
            </p>
            <p className="text-center text-gray-500 text-sm mt-3 px-2">
              We understand {"you're"} an introvert, but {"you've"} got to start
              somewhere 😊
            </p>
          </>
        )}
      </div>
    </div>
  );
};
