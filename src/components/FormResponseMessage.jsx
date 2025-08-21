import PropTypes from "prop-types"
import { LuCircleCheck, LuTriangleAlert } from "react-icons/lu"

const FormResponseMessage = ({ apiResponse }) => {
    return (
        <div className="message-box">
            <div className={`message flex items-center gap-4 border-2 p-2 ${apiResponse.success ? "text-green-700 bg-green-100 border-green-200" : "text-red-700 bg-red-100 border-red-200"} rounded-xl`}>
                <div className="icon">{
                    apiResponse.success ? <LuCircleCheck size={24} /> : <LuTriangleAlert size={24} />
                }</div>

                <p>{
                    apiResponse.message
                }</p>
            </div>
        </div>
    )
}

FormResponseMessage.propTypes = {
    apiResponse: PropTypes.object.isRequired
}

export default FormResponseMessage
