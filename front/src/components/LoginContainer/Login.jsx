import React from 'react'

export default ({handleChange, handleSubmit}) => (
    <div>
        <h1 className="text-center">Login</h1>
        <div className="row">
            <div className="card mx-auto mt-5 col-md-4 shadow-lg bg-white rounded">
                <div className="card-body">
                    <form  onSubmit={handleSubmit} className="mx-auto">
                        <div className="form-group">
                            <label><b>Username</b></label>
                            <input onChange={handleChange} name="username" type="username" className="form-control" placeholder="Ej: Ash Ketchup" />
                        </div>
                        <div className="form-group">
                            <label><b>Password</b></label>
                            <input onChange={handleChange} name="password" type="password" className="form-control" />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
)