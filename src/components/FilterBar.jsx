const FilterBar = ({ filters, setFilters }) => {

    return (

        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>



            {/* Search */}

            <input
  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                placeholder="Search..."

                value={filters.search}

                onChange={(e) =>

                    setFilters({ ...filters, search: e.target.value })

                }

            />



            {/* Assignee */}

            <input

  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"


                placeholder="Assignee"

                value={filters.assignee}

                onChange={(e) =>

                    setFilters({ ...filters, assignee: e.target.value })

                }

            />



            {/* Priority */}

            <select
className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.priority}

                onChange={(e) =>

                    setFilters({ ...filters, priority: e.target.value })

                }

            >

                <option value="">All Priority</option>

                <option value="low">Low</option>

                <option value="medium">Medium</option>

                <option value="high">High</option>

            </select>



        </div>

    );

};



export default FilterBar;