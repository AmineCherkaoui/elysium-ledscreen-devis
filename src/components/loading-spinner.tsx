import {Loader2} from "lucide-react";

const LoadingSpinner = () => {
    return (
        <div className="min-h-screen flex items-center justify-center gap-12 py-12">
            <Loader2 size={128} className="animate-spin text-neutral-600"/>
        </div>
    );
};

export default LoadingSpinner;