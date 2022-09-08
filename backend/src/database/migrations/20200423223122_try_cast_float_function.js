export const up = async (knex) => {
  await knex.raw(`
    create function try_cast_float(float_value anyelement, default_value float default 0)
    returns float
    as
    $$
        begin
            begin
                return $1::float;
            exception 
                when others then
                    return default_value;
            end;
        end;
    $$
    language plpgsql;
    `);
};

export const down = async (knex) => {
  await knex.raw('DROP FUNCTION try_cast_float;');
};
