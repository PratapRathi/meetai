import { Button } from '@/components/ui/button'
import Link from "next/link";

const CallEnded = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
      <div className="py-4 px-8 flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">Bạn đã kết thúc cuộc gọi</h6>
            <p className="text-sm">
              Tóm tắt cuộc gọi sẽ được ghi lại trong vài phút.
            </p>
          </div>
          <Button asChild>
            <Link href="/meetings">Quay lại các cuộc họp</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CallEnded